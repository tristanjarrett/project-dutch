const router = require('express').Router();
const Invoice = require('../models/Invoice');
const verify = require('./token');

// get list of invoices, requires jwt token
router.get('/', verify, async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.json(invoices);
    } catch (err) {
        res.json({message: err})
    }
});

// create new invoice
router.post('/new', async (req, res) => {
    const invoice = new Invoice({
        title: req.body.title,
        amount: req.body.amount
    });
    try {
        const savedInvoice = await invoice.save();
        res.send(savedInvoice);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;