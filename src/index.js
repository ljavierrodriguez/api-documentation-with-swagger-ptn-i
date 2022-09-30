require('dotenv').config();
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument1 = require('./data/swagger1.json');
const swaggerDocument2 = require('./data/swagger2.json');
const PORT = process.env.PORT || 9000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api-docs/v1', swaggerUI.serve, swaggerUI.setup(swaggerDocument1, { explorer: true }));
app.use('/api-docs/v2', swaggerUI.serve, swaggerUI.setup(swaggerDocument2, { explorer: true }));

const contacts = [
    { id: 1, name: 'Luis', phone: '+56900000000'}
]

app.get('/api/contacts', (req, res) => {
    return res.json({ status: 'success', message: 'List of contacts successfully', results: contacts });
})

app.post('/api/contacts', (req, res) => {
    contacts.push(req.body);
    return res.json({ status: 'success', message: 'Contact created successfully', results: contacts });
})

app.put('/api/contacts/:position', (req, res) => {
    const { position } = req.params;
    contacts[position] = req.body;
    return res.json({ status: 'success', message: 'Contact updated successfully', results: contacts });
})

app.delete('/api/contacts/:position', (req, res) => {
    const { position } = req.params;
    contacts = contacts.filter((contact, index) =>  index !== position )
    return res.json({ status: 'success', message: 'Contact deleted successfully', results: contacts });
})



app.listen(PORT, () => console.log(`Server runnging on PORT ${PORT}`));