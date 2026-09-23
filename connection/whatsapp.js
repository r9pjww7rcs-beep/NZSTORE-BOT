const {default:makeWASocket,useMultiFileAuthState,DisconnectReason}=require('@whiskeysockets/baileys');
const pino=require('pino');
const handler=require('../message');

async function connectWhatsApp(){
 const {state,saveCreds}=await useMultiFileAuthState('./session');

 const sock=makeWASocket({
  auth:state,
  logger:pino({level:'silent'})
 });

 sock.ev.on('creds.update',saveCreds);

 sock.ev.on('messages.upsert',async({messages})=>{
  const msg=messages[0];
  if(!msg.message || msg.key.fromMe) return;
  await handler(sock,msg);
 });

 sock.ev.on('connection.update',({connection})=>{
  if(connection==='open') console.log('NZSTORE-BOT CONNECTED');
 });

 return sock;
}

module.exports=connectWhatsApp;
