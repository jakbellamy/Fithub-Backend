import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import userRoutes from './src/routes/userRoutes'
import authRoutes from './src/routes/authRoutes'
import setCardRoutes from './src/routes/setCardRoutes'
import workoutRoutes from './src/routes/workoutRoutes'


const app = express()
const PORT = 5000
const cors = require('cors')

app.use(cors())
//mongoose connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/fithubDB', {useNewUrlParser: true})

//bodyparser setup
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//router setup
userRoutes(app)
authRoutes(app)
setCardRoutes(app)
workoutRoutes(app)

//serving static files
app.use(express.static('public'))

app.get('/', (req, res) =>
    res.send(`Node and Express are running on port ${PORT}`)
)

app.listen(PORT, () => 
    console.log(`your server is running on port ${PORT}`)
)
