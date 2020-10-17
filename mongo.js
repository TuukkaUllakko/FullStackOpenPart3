const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const myArgs = process.argv.slice(3)

const url =
  `mongodb+srv://123:${password}@cluster0.r8puz.mongodb.net/Part3Phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: myArgs[0],
    number: myArgs[1],
  })

if (process.argv.length > 3)
{     
      person.save().then(result => {
        console.log(`added ${myArgs[0]} number ${myArgs[1]} to phonebook`)
        mongoose.connection.close()
      })
}
else if (process.argv.length === 3)
{
    console.log('Phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
}