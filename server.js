var express = require('express');
var app = express();
var wkhtmltopdf = require('wkhtmltopdf');
app.use(express.static(__dirname + '/src'));

app.post('/generatePDF', function(req, res) {
  console.log(req.body);
  wkhtmltopdf(req.body).pipe(res);
})

app.get('/*', function(request, response) {
  response.sendFile(__dirname + '/src/index.html');
});
app.listen(process.env.PORT || 8080, function() {
  console.log('server started');
});
