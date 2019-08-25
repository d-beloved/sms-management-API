// import validator from 'validator';
import isEmpty from './is_empty';

/**
 *
 * @description controller class with for users input validation
 *  @class ContactValidation
 */
class Validation {
  /**
   *  @description method for validation of create contact input
   *  @param {object} data body of the user's request
   *  @returns {object} The body of  the response message
   */
  static validateCreateContact(data) {
    const error = {};
    data.name = data.name ? data.name : '';
    data.phoneNumber = data.phoneNumber ? data.phoneNumber : '';
    if (!(data.name)) {
      error.name = 'Please enter a valid contact name';
    }
    if (!(data.phoneNumber)) {
      error.email = 'Please enter a phone number';
    }
    return {
      error,
      isValid: isEmpty(error),
      status: 'error'
    };
  }

  /**
   *  @description method for validation of send sms
   *  @param {object} data body of the user's request
   *  @returns {object} The body of  the response message
   */
  static validateSendSMS(data) {
    const error = {};
    data.message = data.message ? data.message : '';
    data.sender = data.sender ? data.sender : '';
    data.receiver = data.receiver ? data.receiver : '';
    if (!(data.message)) {
      error.message = 'Please type a message';
    }
    if (!(data.sender)) {
      error.sender = 'Please input the sender of the message';
    }
    if (!(data.receiver)) {
      error.receiver = 'Please input the receiver of the message';
    }
    return {
      error,
      isValid: isEmpty(error),
      status: 'error'
    };
  }

  // /**
  //  * @description method for validation of login input
  //  * @param  {object} data  body of the user's request
  //  * @returns {object} The body of the response message
  //  */
  // static validateLoginInput(data) {
  //   const error = {};

  //   data.email = data.email ? data.email : '';
  //   data.password = data.password ? data.password : '';


  //   if (!(data.email)) {
  //     error.email = 'Please enter your registered email';
  //   }

  //   if (!(data.password)) {
  //     error.password = 'Please enter your password';
  //   }

  //   return {
  //     error,
  //     isValid: isEmpty(error),
  //     status: 'error'
  //   };
  // }

  // /**
  //  * @description method for validation of profile update
  //  * @param  {object} data  body of the user's request
  //  * @returns {object} The body of the response message
  //  */
  // static validateProfileInput(data) {
  //   const error = {};

  //   const { role } = data;
  //   data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  //   data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  //   data.username = !isEmpty(data.username) ? data.username : '';
  //   data.bio = !isEmpty(data.bio) ? data.bio : '';
  //   data.image = !isEmpty(data.image) ? data.image : '';
  //   data.twitter = !isEmpty(data.twitter) ? data.twitter : '';
  //   data.linkedin = !isEmpty(data.linkedin) ? data.linkedin : '';

  //   if (!validator.isEmpty(data.username) && !validator.isLength(data.username, {
  //     min: 2, max: 15
  //   })) {
  //     error.username = 'Username should to be between 2 and 15 characters';
  //   }

  //   if (!validator.isEmpty(data.firstName) && !validator.isLength(data.firstName, {
  //     min: 1, max: 20
  //   })) {
  //     error.firstName = 'First name should not be more than 20 characters';
  //   }

  //   if (!validator.isEmpty(data.lastName) && !validator.isLength(data.lastName, {
  //     min: 1, max: 20
  //   })) {
  //     error.lastName = 'Last name should not be more than 20 characters';
  //   }

  //   if (!isEmpty(data.twitter)) {
  //     if (!validator.isURL(data.twitter)) {
  //       error.twitter = 'twitter URL is not valid';
  //     }
  //   }

  //   if (!isEmpty(data.linkedin)) {
  //     if (!validator.isURL(data.linkedin)) {
  //       error.linkedin = 'linkedin URL is not valid';
  //     }
  //   }

  //   if (!isEmpty(role)) {
  //     if (role !== 'user' && role !== 'author' && role !== 'admin') {
  //       error.role = 'role type is not valid';
  //     }
  //   }


  //   return {
  //     error,
  //     isValid: isEmpty(error),
  //     status: 'error'
  //   };
  // }
}

export default Validation;
