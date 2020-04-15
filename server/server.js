const express = require("express");
const router = require('./config/api.route.config');

const app = express();
app.use('/', router);

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
})

app.listen(process.env.PORT || 8000, function () {
  console.log("App now running on port", 8000);
});