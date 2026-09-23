const products=require('../database/products.json');
module.exports=(s,c)=>{
 let text='🛒 KATALOG NZSTORE\n\n';
 products.forEach((p,i)=>{text+=`${i+1}. ${p.name} - ${p.price}\n`;});
 s.sendMessage(c,{text});
};
