import { Router } from 'express';
import SMSController from '../../controllers/smsController';

const smsRoutes = Router();

smsRoutes.post('/', SMSController.sendSMS);
// smsRoutes.get('/', SMSController.getContacts);

export default smsRoutes;
