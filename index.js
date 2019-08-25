import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import log from 'fancy-log';
import router from './src/routes';

const isProduction = process.env.NODE_ENV === 'production';

// Create global app object
const app = express();

// Normal express config defaults
app.use(require('morgan')('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
// set view engine as pug
app.set('view engine', 'pug');

app.use(router);

// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (!isProduction) {
//   app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
//     log(err.stack);

//     res.status(err.status || 500);

//     res.json({
//       error: {
//         message: err.message,
//         error: err
//       },
//       status: 'error'
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
//   res.status(err.status || 500);
//   return res.json({
//     error: {
//       message: err.message,
//       error: {}
//     },
//     status: 'error'
//   });
// });

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3111, () => {
  log(`Listening on port ${server.address().port}`);
});

export default app;
