import { Op } from 'sequelize';

import { Contact } from '../models';
import ContactValidation from '../utils/validation';

/**
 * @description controller class with methods for contact endpoints
 * @class ContactController
 */
class ContactController {
  /**
   * @description Create contact method for new users
   * @param  {object} req body of the user's request
   * @param  {object} res  body of the response message
   * @param  {function} next next function to be called
   * @returns {object} The body of the response message
   */
  static createContact(req, res, next) {
    const { error, isValid } = ContactValidation.validateCreateContact(req.body);
    if (!isValid) {
      return res.status(400).json({ status: 'error', error });
    }

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(req.body.phoneNumber) || req.body.phoneNumber.length < 10) {
      return res.status(400).json({
        status: error,
        error: 'Please enter a valid number not less than 10 digits'
      });
    }

    const newContact = {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber
    };

    Contact.findOne({
      where: {
        [Op.or]: [{ name: newContact.name }, { phoneNumber: newContact.phoneNumber }]
      }
    }).then((contact) => {
      if (!contact) {
        return Contact.create(newContact)
          .then((createdContact) => {
            const { dataValues } = createdContact;
            return res.status(201).json({
              message: 'Contact created successfully',
              status: 'success',
              contact: dataValues
            });
          })
          .catch(next);
      }
      return res.status(409).json({
        status: error,
        error: 'You have same name or phone number in your contact already'
      });
    })
      .catch(next);
  }
}

export default ContactController;