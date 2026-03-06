const mongoose = require('mongoose')

const dns = require('dns')

dns.setServers(['8.8.8.8', '8.8.4.4'])
const url = process.env.MONGODB_URI


mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
        validator: function(v) {
            return /^\d{2,3}-\d+$/.test(v)
        },
        message: props => `${props.value} is not a valid phone number`
    }}
})

personSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
}
)

module.exports = mongoose.model('Person', personSchema)