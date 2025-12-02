const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  status: { type: String, enum: ['PENDING','CALLED','SERVED','CANCELLED'], default: 'PENDING' },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String }
});

module.exports = mongoose.model('Ticket', TicketSchema);
