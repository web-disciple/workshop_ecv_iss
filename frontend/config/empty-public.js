const empty = require('empty-folder');
 
empty('./public', false, (o)=>{
  if(o.error) console.error(o.error);
  //console.log(o.removed);
  //console.log(o.failed);
});