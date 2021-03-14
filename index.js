const express = require('express');

// configurations
const PORT = 14700;
const app = express();

app.use(express.json());

// my modules imports
const contactDb = require('./db')('Contact', ['id', 'name', 'phone', 'companyId']);
const companyDb = require('./db')('Company');
const quoteDb = require('./db')('Quote');

const contact = require('./crud')({
    db: contactDb,
    /*middlewares: {
        post: function (req, res, next) {
            const data = req.body;
            if (companyDb.filter(c => c.id == data.companyId).length > 0) {
                next()
            } else {
                res.status(400).send();
            }
        }
    }*/
});
const company = require('./crud')({
    db: companyDb
});
const quote = require('./crud')({
    db: quoteDb
});



app.use('/contact', contact);
app.use('/company', company);
app.use('/quote', quote);


app.listen(PORT, () => console.log(`server started at port ${PORT}`));