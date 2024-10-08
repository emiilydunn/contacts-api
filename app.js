import express from 'express';
import cors from 'cors';
import contactsRouter from './routes/contacts.js';

const port = process.env.PORT || 3000;
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//CORS
app.use(cors());

//Routes
app.use('/api/contacts', contactsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
