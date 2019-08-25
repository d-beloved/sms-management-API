import { Router } from 'express';

const welcomeRoute = Router();

welcomeRoute.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to D-beloved\'s SMS management API',
    endpoints: {
      signup: 'POST /api/v1/auth/signup',
      login: 'POST /api/v1/auth/login',
      getAllRideOffer: 'GET /api/v1/rides',
      getOneRideOffer: 'GET /api/v1/rides/:rideId',
      makeRequestForRide: 'POST /api/v1/rides/:rideId/requests',
      createRideOffer: 'POST /api/v1/users/rides',
      getAllRequestsForRide: 'GET /api/v1/GET /users/rides/:rideId/requests',
      acceptRejectRequests: 'PUT /api/v1//users/rides/:rideId/requests/:requestId'
    }
  });
});

export default welcomeRoute;
