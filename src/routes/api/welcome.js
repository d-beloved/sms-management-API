import { Router } from 'express';

const welcomeRoute = Router();

welcomeRoute.all('*', (req, res) => {
  res.status(200).json({
    message: 'Welcome to D-beloved\'s SMS management API',
    availableEndpoints: {
      createContact: 'POST /api/contacts',
      getAllContacts: 'GET /api/contacts',
      deleteContacts: 'DELETE /api/contacts/:id',
    }
  });
});

export default welcomeRoute;
