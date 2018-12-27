const app = require('../index')
var port = 3000
const syncDB = require('./sync-db')


syncDB()
  .then(() => {
    console.log('sync DB')
    app.listen(port, function () {
      console.log(`Example app listening on port ${port}!`);
    })
  });
