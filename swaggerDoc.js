/* import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swagger: '2.0',
  swaggerDefinition: {
    info: {
      title: 'Test auto mart',
      version: '1.0.0',
      description: 'Testing auto mart'
    },
    host: 'https://auto-mart1.herokuapp.com/',
    basePath: '/',

  },
  apis: ['server/routes/route.js'],

};

const specs = swaggerJsdoc(options);
module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(options));
};
*/
