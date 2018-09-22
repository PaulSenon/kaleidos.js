let express = require('express');

var app = express()
app.use(express.static('.'))

app.get('/', function (req, res) {
  res.sendfile('index.html');
  console.log(req);
})
 
app.listen(80);