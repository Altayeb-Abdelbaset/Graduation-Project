const mongoose = require('mongoose');

const urlString = `mongodb+srv://mina79:79430437@cluster0.t86la.mongodb.net/zhelper2022?retryWrites=true&w=majority`
const connection = () => mongoose.connect(urlString)
    .then(console.log("db is connected"))
    .catch((err) => { console.log("Error", err) });

module.exports = connection;