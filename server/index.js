var path = require('path')
const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')
const passport = require('passport')

const passportMiddlware = require('./middleware/passport')


const app=express()
app.use(bodyParser.json())
app.use(cors())

app.use(passport.initialize())
passportMiddlware(passport)

app.use('/api/auth/', require('./routes/auth'))
app.use('/api/posts/', require('./routes/posts'))

app.use(express.static(path.join(__dirname, 'dist')))
app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')))

const PORT=process.env.PORT||10000

async function start() {
  try {
    await mongoose.connect('mongodb+srv://sten_ready:GxX4Ih4WIpaVMucL@cluster0-xmheq.mongodb.net/stasApp?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log('mongo db is started')
    app.listen(PORT, () => console.log(`server has been started on port: ${PORT}`))
  } catch (error) {
    console.log(`у нас ошибка ${error}`)
  }
}

start()
