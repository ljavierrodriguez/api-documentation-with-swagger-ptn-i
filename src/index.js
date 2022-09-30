require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 9000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const contacts = [
    { id: 1, name: 'Luis', phone: '+56900000000'}
]

app.get('/api/contacts', (req, res) => {
    return res.json({ status: 'success', message: 'List of contacts successfully', data: contacts });
})

app.post('/api/contacts', (req, res) => {
    contacts.push(req.body);
    return res.json({ status: 'success', message: 'Contact created successfully', data: contacts });
})

app.put('/api/contacts/:position', (req, res) => {
    const { position } = req.params;
    contacts[position] = req.body;
    return res.json({ status: 'success', message: 'Contact updated successfully', data: contacts });
})

app.delete('/api/contacts/:position', (req, res) => {
    const { position } = req.params;
    contacts = contacts.filter((contact, index) =>  index !== position )
    return res.json({ status: 'success', message: 'Contact deleted successfully', data: contacts });
})



app.listen(PORT, () => console.log(`Server runnging on PORT ${PORT}`));