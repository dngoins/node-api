const express = require('express');

const app = express();
const port = 3000;
const apiRoutes = require('./routes/api');
 
const swaggerSetup = require('./swagger');


//TODO: 1. Use Environment Variables

//TODO: 2. Setup common security Headers using Helmet

//TODO: 3. Enable Cross-Origin Resource Sharing (CORS)

//TODO: 4. Apply Rate Limiting to APIs

//TODO: 5. Prevent Parameter Pollution

//TODO: 6. Prevent XSS Attacks

//TODO: 7. Add Logging and Monitoring with winston and morgan

app.use(express.json());
app.use('/api', apiRoutes);

swaggerSetup(app);

app.get('/', (req, res) => {
  res.send('Node-Subscribers-API Welcome Page');
});

app.get('/swagger.yaml', (req, res) => {
  res.sendFile('./postman/swagger.yaml', { root: '.' });

});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
 
