import { Router } from 'express';

import contactRoutes from './contactRoute';
import smsRoutes from './smsRoutes';


const routes = Router();

routes.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      error: Object.keys(err.error).reduce((error, key) => {
        error[key] = err.error[key].message;
        return error;
      }, {})
    });
  }
  return next(err);
});

routes.use('/contacts', contactRoutes);
routes.use('/sms', smsRoutes);

export default routes;
