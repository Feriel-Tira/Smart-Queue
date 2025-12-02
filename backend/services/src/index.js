const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Ticket = require('./models/Ticket');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongo:27017/queue_db';

// Endpoint minimal
app.get('/queues', async (req, res) => {
  const waitingCount = await Ticket.countDocuments({ status: 'PENDING' });
  res.json([{ id: 'L1', name: 'Guichet Principal', waitingCount }]);
});

app.post('/tickets', async (req, res) => {
  const last = await Ticket.findOne({}).sort({ number: -1 });
  const number = last ? last.number + 1 : 1;
  const ticket = new Ticket({ number, userId: req.body.userId });
  await ticket.save();
  res.json(ticket);
});

const port = process.env.PORT || 4001;
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => console.log(`Queue service listening on ${port}`));
  })
  .catch(err => console.error('Mongo connect error', err));
