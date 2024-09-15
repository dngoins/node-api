const express = require('express');

const app = express();
const port = 3000;
const apiRoutes = require('./routes/api');
 
const swaggerSetup = require('./swagger');


//TODO: 1. Use Environment Variables
const dotenv = require('dotenv');
dotenv.config();


// Other middleware and routes

//TODO: 2. Setup common security Headers using Helmet
const helmet = require('helmet');
app.use(helmet());

//TODO: 3. Enable Cross-Origin Resource Sharing (CORS)
const cors = require('cors');
app.use(cors());

//TODO: 4. Apply Rate Limiting to APIs
const rateLimit = require('express-rate-limit');
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

//TODO: 5. Prevent Parameter Pollution
const hpp = require('hpp');
app.use(hpp());

//TODO: 6. Prevent XSS Attacks
const xss = require('xss-clean');
app.use(xss());

//TODO: 7. Add Logging and Monitoring with winston and morgan
const winston = require('winston');
const morgan = require('morgan');
app.use(morgan('combined', { stream: winston.stream.write }));

app.use(express.json());
app.use('/api', apiRoutes);

swaggerSetup(app);

app.get('/', (req, res) => {
  res.send('Node-API-Subscribers Welcome Page');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
 
