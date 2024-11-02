const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

//Server-side values
let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

function getMembershipDiscount(cartTotal, isMember) {
  let finalPrice;
  if (isMember === 'true') {
    finalPrice = cartTotal * (1 - discountPercentage / 100);
  } else {
    finalPrice = cartTotal;
  }
  return finalPrice;
}

function getTax(cartTotal) {
  return (cartTotal * taxRate) / 100;
}

function getEstimateDelivery(shippingMethod, distance) {
  let estimatedDelivery;
  if (shippingMethod === 'express') {
    estimatedDelivery = distance / 100;
  } else if (shippingMethod === 'standard') {
    estimatedDelivery = distance / 50;
  }
  return estimatedDelivery;
}

function getShippingCost(weight, distance) {
  let shippingCost = weight * distance * 0.1;
  return shippingCost;
}

function getLoyaltyPoints(purchaseAmount) {
  let loyaltyPoints = purchaseAmount * loyaltyRate;
  return loyaltyPoints;
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  totalCartValue = cartTotal + newItemPrice;
  res.send(totalCartValue.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;

  res.send(getMembershipDiscount(cartTotal, isMember).toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(getTax(cartTotal).toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  res.send(getEstimateDelivery(shippingMethod, distance).toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  res.send(getShippingCost(weight, distance).toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  res.send(getLoyaltyPoints(purchaseAmount).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
