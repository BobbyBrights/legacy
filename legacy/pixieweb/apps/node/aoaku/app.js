/* 
 * Aoaku Node Application 
 *
 * By Stephen McElhinney
 * 
 */
var express = require('express')
  , params = require('express-params')
  , Hogan = require('hogan.js')
  , app = express();

params.extend(app);

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.engine('ejs', require('ejs').__express);

app.get('/about', function (req, res)
{
    res.render('about.html');
});

app.listen(3000);

