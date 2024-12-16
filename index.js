const express = require('express');
let cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

//Server-side values
let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

//Endpoint-1
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let newTotal = newItemPrice + cartTotal;
  res.send(newTotal.toString());
});

//Endpoint-2
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  let newTotal;

  if (isMember) {
    newTotal = cartTotal - (cartTotal * discountPercentage) / 100;
  } else {
    newTotal = cartTotal;
  }
  res.send(newTotal.toString());
});

//Endpoint-3
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = (cartTotal * taxRate) / 100;
  res.send(tax.toString());
});

//Endpoint-4
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  if (shippingMethod === 'standard') {
    deliveryDays = distance / 50;
  } else {
    deliveryDays = distance / 100;
  }
  res.send(deliveryDays.toString());
});

//Endpoint-5
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  let shipping_cost = weight * distance * 0.1;

  res.send(shipping_cost.toString());
});

//Endpoint-6
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  let loyaltyPoints = purchaseAmount * loyaltyRate;

  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
