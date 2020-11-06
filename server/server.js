import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

require('dotenv').config();
// Connection URL
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${process.env.MONGODB_URI}`)
})

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
})

app.use('/', userRoutes)
app.use('/', authRoutes)