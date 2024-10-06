const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Subscriber API',
            version: '1.0.0',
            description: 'List, Add, Update and Delete Subscribers',
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
              },
              contact: {
                name: "CompTIA",
                url: "https://www.comptia.com",
                email: "dng-root@unnst.com",
              },
            },
            servers: [
              {
                url: "http://localhost:3000",
              },
            ],
          },
    apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
