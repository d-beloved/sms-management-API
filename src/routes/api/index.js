import { Router } from 'express';

import contactRoutes from './contactRoute';
import welcomeRoute from './welcome';


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
routes.use('/', welcomeRoute);

export default routes;
