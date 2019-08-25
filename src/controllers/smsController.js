// import { Op } from 'sequelize';

import { Contact, ReceivedSms, SentSms } from '../models';
import trimInput from '../utils/trimInput';
import Validation from '../utils/validation';

/**
 * @description controller class with methods for SMS endpoints
 * @class SMSController
 */
class SMSController {
  /**
   * @description Create SMS method
   * @param  {object} req body of the user's request
   * @param  {object} res  body of the response message
   * @param  {function} next next function to be called
   * @returns {object} The body of the response message
   */
  static sendSMS(req, res, next) {
    const { message, sender, receiver } = req.body;
    const newMessage = {
      message: trimInput(message),
      sender: trimInput(sender.toLowerCase()),
      receiver: trimInput(receiver.toLowerCase())
    };

    const { error, isValid } = Validation.validateSendSMS(newMessage);
    if (!isValid) {
      return res.status(400).json({ status: 'error', error });
    }

    if (sender === receiver) {
      return res.status(400).json({
        status: 'error',
        error: 'sorry, you can\'t send a message to yourself. You could talk to yourself instead'
      });
    }
    Contact.findOne({
      where: {
        name: newMessage.sender
      }
    }).then((contact) => {
      if (!contact) {
        return res.status(400).json({
          status: 'error',
          error: `${sender} is not a contact on our service, please register and try again`
        });
      }
      Contact.findOne({
        where: {
          name: newMessage.receiver
        }
      }).then((receiverContact) => {
        if (!receiverContact) {
          return res.status(400).json({
            status: 'error',
            error: `The recipient ${receiver} is not yet registered on this platform`
          });
        }

        const senderId = { senderId: contact.dataValues.id };
        const fullMessage = Object.assign(newMessage, senderId);

        SentSms.create(fullMessage)
          .then((sentMessage) => {
            const { dataValues } = sentMessage;
            const smsMessage = dataValues;
            res.status(201).json({
              message: 'message sent successfully',
              status: 'success',
              body: smsMessage
            });
            return smsMessage;
          })
          .then((smsMessage) => {
            const source = {
              receiverId: receiverContact.dataValues.id,
              smsId: smsMessage.id
            };
            const fullReceivedMessage = Object.assign(fullMessage, source);

            ReceivedSms.create(fullReceivedMessage)
              .then((receivedMessage) => {
                const { dataValues } = receivedMessage;
                return res.status(201).json({
                  message: 'message sent successfully',
                  status: 'success',
                  body: dataValues
                });
              }).catch(next);
          });
      }).catch(next);
    }).catch(next);
  }
}

export default SMSController;
