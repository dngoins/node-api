const express = require('express');
const router = express.Router();

// In-memory array to store subscribers
let subscribers = [
    { id: 1, name: 'Alice', subscribedToChannel: 'Bitcoin' },
    { id: 2, name: 'Bob', subscribedToChannel: 'Ethereum' },
    { id: 3, name: 'Charlie', subscribedToChannel: 'Litecoin' },
    { id: 4, name: 'Dave', subscribedToChannel: 'Ripple' },
    { id: 5, name: 'Eve', subscribedToChannel: 'Bitcoin Cash' }
];
let nextId = 6;

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Retrieve a list of subscribers
 *     responses:
 *       200:
 *         description: A list of subscribers
 *         content:
 *           application/json:
 *             schema:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   subscribedToChannel:
 *                     type: string
 */
router.get('/items', async (req, res) => {
    try {
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}); 


//TODO: 1. Validate user input
const Joi = require('joi');
const subscriberSchema = Joi.object({  
    id: Joi.number(),
    name: Joi.string().required(),
    subscribedToChannel: Joi.string().required()
});


//TODO: 2. OAuth2.0 Token Validation
const validateToken = require('../validate-tokens');

/**
 * @swagger
 * /api/items/{id}:
 *   post:
 *     summary: Create a new subscriber
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               subscribedToChannel:
 *                 type: string
 *                 example: Channel1
 *     responses:
 *       201:
 *         description: Subscriber created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 subscribedToChannel:
 *                   type: string
 */
//TODO: 2a. Validate Token
router.post('/items/:id', validateToken, async (req, res) => {
    try {

        //TODO: 1a. Validate request body against schema
        const { error } = schema.validate(req.body);
        if (error) 
            return res.status(400).json({ message: error.details[0].message });

        const newSubscriber = {
            id: nextId++,
            name: req.body.name,
            subscribedToChannel: req.body.subscribedToChannel
        };
        subscribers.push(newSubscriber);
        res.status(201).json(newSubscriber);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}); 

/**
 * @swagger
 * /api/items/{id}:
 *   patch:
 *     summary: Update an existing subscriber
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The subscriber ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               subscribedToChannel:
 *                 type: string
 *                 example: Channel2
 *     responses:
 *       200:
 *         description: Subscriber updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 subscribedToChannel:
 *                   type: string
 */
router.patch('/items/:id', validateToken, async (req, res) => {
    try {

        //TODO: 1b. Validate request body against schema
        const { error } = schema.validate(req.body);
        if (error) 
            return res.status(400).json({ message: error.details[0].message });

        const id = parseInt(req.params.id);
        const subscriber = subscribers.find(sub => sub.id === id);
        if (!subscriber) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }
        subscriber.name = req.body.name;
        subscriber.subscribedToChannel = req.body.subscribedToChannel;
        res.json(subscriber);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Delete a subscriber
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The subscriber ID
 *     responses:
 *       204:
 *         description: Subscriber deleted successfully
 */
router.delete('/items/:id', validateToken, async (req, res) => {
    try {

        //TODO: 1c. Validate Id paramater
        const id_schema = Joi.object({ id: Joi.number() });        
        const { error } = id_schema.validate(req.params);
        if (error) 
            return res.status(400).json({ message: error.details[0].message });

        const id = parseInt(req.params.id);
        subscribers = subscribers.filter(sub => sub.id !== id);
        res.status(204).json({ message: 'Deleted Subscriber' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

  

module.exports = router;
