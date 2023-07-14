const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const userRoute = require('../routes/handler');
const LogInCollection = require("./mongodb")

const tempelatePath = path.join(__dirname, '../templates')



app.use('/handler', userRoute);
app.use(express.json())
app.set("view engine", "hbs")
app.set("views", tempelatePath)
app.use(express.urlencoded({ extended: false }))
app.use('/public', express.static(path.join(__dirname, "../public")));

app.get('/', (req, res) => {
    res.render('login' )
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', async (req, res) => {
    
    
    const data = {
        name: req.body.name,
        password: req.body.password
        
    }

    await LogInCollection.insertMany([data])
    res.render("bookstore")
})

app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("bookstore", { naming: `${req.body.password}+${req.body.name}` })
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {

        res.send("wrong details")
        

    }


})



app.listen(4000,()=>{
    console.log("port connected");
})