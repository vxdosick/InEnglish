import express from 'express';
const cors = require("cors")
import { MONGO, PORT } from './config';
import { connect } from 'mongoose';
import { cardRouter } from './routers/cardRouter';
const path  = require('path')

const app = express();

app.use(cors({
    origin: 'https://inenglish-1.onrender.com'
}));

app.use(express.json());

connect(MONGO).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

app.use('/api/card', cardRouter);


app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
