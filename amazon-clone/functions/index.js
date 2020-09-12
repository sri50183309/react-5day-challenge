const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51HQJ8BBNC5WdoLWohmsSnZZXxzm1eVEwYzLH3gbv6L8nsjQlb6ExjcLDgYqarrjcZV0cWTxMTnLl9GuttcAcIuCD007zM4ARAP');

//API

// - App Config
const app = express();

// - Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// - API Routes
app.get('/', (request,response) => response.status(200).send('hello world'))
app.get('/sriram', (request,response) => response.status(200).send('whats up sriram'))
app.post('/payments/create', async (request, response) => {
    const total = request.query.total; //variable to read subunits from front end
    console.log('Payment Request Received BOOM !! for this amount >>> ', total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of the currency
        currency: "usd",
    });

    //OK - Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
})

// - Listen Command (set up needed )
exports.api = functions.https.onRequest(app)

