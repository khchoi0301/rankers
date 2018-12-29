const app = require('../index')
var port = 3000
const syncDB = require('./sync-db')

syncDB.sync()
  .then(() => {
    console.log('sync DB')
    syncDB.addUsers()
    syncDB.addServices()
    syncDB.addReviews()
    console.log('add data to tables')
  })
  .then(() => {
    app.listen(port, function () {
      console.log(`Example app listening on port ${port}!`);
    })
  })
