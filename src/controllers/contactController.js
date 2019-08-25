/* eslint-disable no-restricted-globals */
import { Op } from 'sequelize';

import { Contact } from '../models';
import Validation from '../utils/validation';
import trimInput from '../utils/trimInput';

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
    const { error, isValid } = Validation.validateCreateContact(req.body);
    if (!isValid) {
      return res.status(400).json({ status: 'error', error });
    }

    if (isNaN(req.body.phoneNumber) || req.body.phoneNumber.length < 10) {
      return res.status(400).json({
        status: error,
        error: 'Please enter a valid number not less than 10 digits'
      });
    }

    const newContact = {
      name: trimInput(req.body.name.toLowerCase()),
      phoneNumber: trimInput(req.body.phoneNumber.toLowerCase())
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

  /**
   * @description Get all contacts in the app
   * @param  {object} req body of the user's request
   * @param  {object} res  body of the response message
   * @param  {function} next next function to be called
   * @returns {object} The body of the response message
   */
  static getContacts(req, res, next) {
    Contact.findAll()
      .then((contacts) => {
        if (contacts.length >= 1) {
          // const filteredContacts = [];
          // for (let i = 0; i < contacts.length; i++) {
          //   const [{ dataValues }] = contacts;
          //   const { createdAt, updatedAt, ...rest } = dataValues;
          //   filteredContacts.push(rest);
          // }
          return res.status(200).json({
            message: 'Here are your contacts',
            status: 'success',
            Contacts: contacts
          });
        }
        return res.status(200).json({
          message: 'You don\'t have any contacts yet',
          status: 'success'
        });
      })
      .catch(next);
  }

  /**
   * @description delete a contact in the app
   * @param  {object} req body of the user's request
   * @param  {object} res  body of the response message
   * @param  {function} next next function to be called
   * @returns {object} The body of the response message
   */
  static deleteContact(req, res, next) {
    const contactId = parseInt(req.params.id, 10);
    if (isNaN(contactId)) {
      return res.status(400).json({
        error: { message: 'please enter a valid Id' },
        status: 'error'
      });
    }

    Contact.findOne({
      where: {
        id: contactId
      }
    })
      .then((contact) => {
        if (!contact) {
          return res.status(404).json({
            error: { message: 'contact not found, please check that you are entering the correct id' },
            status: 'error'
          });
        }

        return contact.destroy()
          .then(() => res.status(200).json({
            message: 'contact successfully deleted',
            status: 'success'
          }))
          .catch(next);
      })
      .catch(next);
  }
}

export default ContactController;
