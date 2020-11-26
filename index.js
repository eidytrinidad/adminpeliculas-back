const express = require("express")
const app = express();
const cors=require('cors')

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.use(cors())

const port=process.env.PORT||4000;

app.use(require("./routes/rutas"))

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})