import express from 'express';

const app = express();

// define the port
const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

// add a new tea
app.post('/teas', (req, res) => {
    const { name, price } = req.body;
    const newTea = {
        id: nextId,
        name,
        price
    };
    teaData.push(newTea);
    nextId++;
    res.status(201).json(newTea);
});

// get all teas
app.get('/teas', (req, res) => {
    res.json(teaData);
});

// get a specific tea
app.get('/teas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tea = teaData.find(tea => tea.id === id);
    if (tea) {
        res.json(tea);
    } else {
        res.status(404).json({ message: 'Tea not found' });
    }
});

// update a specific tea
app.put('/teas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, price } = req.body;
    const tea = teaData.find(tea => tea.id === id);
    if (tea) {
        tea.name = name;
        tea.price = price;
        res.json(tea);
    } else {
        res.status(404).json({ message: 'Tea not found' });
    }
});

// delete a specific tea
app.delete('/teas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = teaData.findIndex(tea => tea.id === id);
    if (index !== -1) {
        teaData.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Tea not found' });
    }
});

// start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});