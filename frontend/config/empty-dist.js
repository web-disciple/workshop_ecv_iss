const empty = require('empty-folder');
empty('./dist', false, (o) => {
  if (o.error) console.error(o.error);
  //console.log(o.removed);
  //console.log(o.failed);
});