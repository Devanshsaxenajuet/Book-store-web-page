const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    res.render('login' )
})



router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', async (req, res) => {
    
    
    const data = {
        name: req.body.name,
        password: req.body.password
        
    }

    await LogInCollection.insertMany([data])
    res.render("home")
})

router.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {

        res.send("wrong details")
        

    }


})

module.exports = router