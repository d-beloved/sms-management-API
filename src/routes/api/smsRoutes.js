import { Router } from 'express';
import SMSController from '../../controllers/smsController';

const smsRoutes = Router();

smsRoutes.post('/', SMSController.sendSMS);
smsRoutes.get('/:smsId/read', SMSController.readSms);

export default smsRoutes;
