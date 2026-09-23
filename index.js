require('dotenv').config();
const connectWhatsApp = require('./connection/whatsapp');

console.log('NZSTORE-BOT COMPLETE STARTING');
connectWhatsApp();
