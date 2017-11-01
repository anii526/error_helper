const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();

const port = 5858;
app.listen(port, () => {
    console.log('We are live on ' + port);
});