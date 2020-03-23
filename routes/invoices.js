const router = require('express').Router();
const Invoice = require('../models/Invoice');
const verify = require('../middleware/token');

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
router.post('/new', verify, async (req, res) => {

    const sum = function(items, prop){
        let val = 0;
        for (i = 0; items.length > i; i++) {
            val += parseFloat(items[i][prop]);
        }
        let output = val.toFixed(2);
        return output;
    };

    const invoice = new Invoice({
        title: req.body.title,
        // lines: [{
        //     title: req.body.lines.title,
        //     description: req.body.lines.description,
        //     amount: req.body.lines.amount,
        //     quantity: req.body.lines.quantity,
        //     total: req.body.lines.total
        // }],
        lines: req.body.lines,
        total: sum(req.body.lines, "total")
    });

    try {
        const savedInvoice = await invoice.save();
        res.send(savedInvoice);
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = router;