import { Router } from 'express';
import ContactController from '../../controllers/contact';

const contactRoutes = Router();

contactRoutes.post('/', ContactController.createContact);
contactRoutes.get('/', ContactController.getContacts);

export default contactRoutes;
