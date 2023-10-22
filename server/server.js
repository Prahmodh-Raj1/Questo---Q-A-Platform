const express = require('express')
const cors = require('cors')
const path = require('path')
const app  = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8000
const db = require('./db')
const router = require('./routers')

//db connection

db.connect()

//middleware
app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({extended: true, limit: "50mb"}))

app.use(express.json())

//header methods
app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next()
})

//api configurations

app.use('/api/',router)

//static resources
app.use('/upload',express.static(path.join(__dirname,'/../uploads')))
app.use(express.static(path.join(__dirname,'/../client/build')))

app.get('*',(req,res)=>{
    try{
        res.sendFile(path.join(`${__dirname}/../client/build/index.html`));
    }catch(e){
        res.send("Error has occurred: " + e.message)
    }
    
})
app.use(cors())
//cors
/*app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // If needed for cookies or authentication
  }));*/
  
  // ... other server setup code
  
  app.listen(8000, () => {
    console.log('Server is running on http://127.0.0.1:8000');
  });
