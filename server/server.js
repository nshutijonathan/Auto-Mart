import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import router from './routes/routes';
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
const swaggerDefinition = {
  swagger: '2.0',
  info: {
    title: 'Test auto mart',
    version: '1.0.0',
    description: 'Testing auto mart'
  },
  host: 'http://localhost:3000/',
  basepath: '/',
  schemes: [
    'https',
    'http'
  ],
  consumes: [
    'application/json'
  ],
  produces: [
    'application/json'
  ],
  paths: {
  	'/api/v1/auth/signup': {
  		post: {
  			tags: [
  			'AUNTENTICATION ENDPOINT ROUTES'
  			],
  			summary: 'User registration',
  			produces: [
  			'application/json'
  			],
  			parameters: [{
  				in: 'body',
  				name: 'body',
  				required: true,
  				schema: {
  					$ref: '#/definitions/users'
  				}
  			}
  			],
  			responses: {
  				201: {
  					description: 'User Registered'
  				},
  				400: {
  					description: 'User failed'
  				},
  				500: {
  					description: 'Internal server error'
  				}
  			}
  		}
  	}
  }
};
const options = {
  swaggerDefinition,
  apis: ['routes/*js'],
};
const swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', (req, res) => {
    	res.setHeader('Content-Type', 'application/json');
    	res.send(swaggerSpec);
});
app.use('/apis-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(port, () => (console.log(`Listening on port ${port}`)));
export default app;
