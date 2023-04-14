const express = require('express')
const app = express()
const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/baking')
  .then(() => console.log('Connected!'));

const { PORT = 3000 } = process.env;

const bakingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    created_at: { type: Date, default: Date.now }
})
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const Baking = mongoose.model('Baking', bakingSchema);

app.get('/baking', function (req, res) {
  // console.log("test 1")
  res.send('GET request call was successful')
  Baking.find()
    .exec()
    .then((data) => console.log(data));
})

app.post('/baking', (req, res) => {
  console.log('test 2')
  res.send('POST request call was successful')
})

app.put('/baking', (req, res) => {
  console.log('test 3')
  res.send('PUT request call was successful')
})

app.delete('/baking', (req, res) => {
  console.log('test 4')
  res.send("DELETE Request Called")
})


app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server listening on :${PORT}/baking`);
});


module.exports = Baking;


// const express = require('express')
// const app = express()

// const {PORT= 3000} = process.env;

// app.get('/baking', function (req, res) {
//     console.log("test 1")
//     res.send('Hello World')
// })

// app.post('/bak', function (req, res) {
//     console.log("test 2")
//     res.send('Hello World')
// })

// app.put('/', function (req, res) {
//     console.log("test 3")
//     res.send('Hello World')
// })

// app.delete('/', function (req, res) {
//     console.log("test 4")
//     res.send('Hello World')
// })

// app.listen(PORT, () => {
//     console.log(`Server listening on :${PORT}/baking`);
// });