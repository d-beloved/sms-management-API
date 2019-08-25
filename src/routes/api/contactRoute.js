import { Router } from 'express';
import ContactController from '../../controllers/contactController';

const contactRoutes = Router();

contactRoutes.post('/', ContactController.createContact);
contactRoutes.get('/', ContactController.getContacts);
contactRoutes.delete('/:id', ContactController.deleteContact);

export default contactRoutes;
