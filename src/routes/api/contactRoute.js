import { Router } from 'express';
import ContactController from '../../controllers/contact';

const contactRoutes = Router();

contactRoutes.post('/', ContactController.createContact);

export default contactRoutes;
