const auth = require('../middelware/auth');
const Customers = require('../models/customersModel');

const router = require('express').Router();

router.post('/', auth, async (req, res) => {
  try {
    const { name, user } = req.body;
    console.log(user);
    const newCustumer = new Customers({
      name,
    });
    const saveCustomer = await newCustumer.save();
    res.json({
      saveCustomer,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const allCustomers = await Customers.find();
    res.json(allCustomers);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
