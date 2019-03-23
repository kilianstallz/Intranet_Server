const mongoose = require('mongoose')

// Mongo DB
const dbRoute = 'mongodb://localhost:27017/intranet'

mongoose.connect(
  dbRoute,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
)

mongoose.Promise = global.Promise

const db = mongoose.connection

db.once('open', () => console.log('Connected to MongoDB'))

// Checks connection
db.on('error', console.error.bind(console, 'Mongo DB connection error!'))
