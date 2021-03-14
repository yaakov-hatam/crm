const express = require('express');

// configurations
const PORT = 14700;
const app = express();

app.use(express.json());

// my modules imports
const contactDb = require('./contact.db')('Contact');
const companyDb = require('./company.db')('Company');
const quoteDb = require('./quote')('Quote');

const contact = require('./crud')({
    db: contactDb
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