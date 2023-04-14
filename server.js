const express = require('express')
const app = express()

const {PORT= 3000} = process.env;

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(PORT, () => {
    console.log(`Server listening on :${PORT}`);
});