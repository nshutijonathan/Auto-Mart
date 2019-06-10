import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import router from './routes/routes';
import swaggerDocument from '../swagger.json';
// set  up the express app
const app = express();

// parse incoming request body
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
// When a random route is inputed
app.get('/', (req, res) => {
  return res.status(200).send({
    status: 200,
    message: 'Welcome to Auto mart',
  });
});
const port = process.env.PORT || 3000;
// app.use('/apis-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, () => (console.log(`Listening on port ${port}`)));
export default app;
