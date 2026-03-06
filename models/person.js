const mongoose = require('mongoose')

const dns = require('dns')

dns.setServers(['8.8.8.8', '8.8.4.4'])
const url = process.env.MONGODB_URI


mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

module.exports = mongoose.model('Person', personSchema)