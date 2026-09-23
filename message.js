const menu=require('./menu');
const catalog=require('./catalog');
const order=require('./order');
const member=require('./member');
const admin=require('./admin');
const payment=require('./payment');
const report=require('./report');

module.exports=async(sock,msg)=>{
 const text=(msg.message.conversation||'').toLowerCase();
 const chat=msg.key.remoteJid;

 if(text==='menu') return menu(sock,chat);
 if(text==='produk') return catalog(sock,chat);
 if(text==='order') return order(sock,chat);
 if(text==='member') return member(sock,chat);
 if(text==='admin') return admin(sock,chat);
 if(text==='bayar') return payment(sock,chat);
 if(text==='laporan') return report(sock,chat);
};
