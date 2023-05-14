const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // default port
const mongoose = require('mongoose');
const detail = require('./models/schema')
const bcrypt = require('bcrypt')
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
const db = "mongodb+srv://user2:12345@cluster0.ux1y5x1.mongodb.net/register?retryWrites=true&w=majority";
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database")
    })
    .catch(err => {
        console.log(err);
    })

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('views'));

app.post('/register', async (req, res) => {
    try {
        const password = req.body.Password;
        const cpassword = req.body.ConfirmPassword;
        if (password === cpassword) {
            const registered = new detail({
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Birthday: req.body.Birthdate,
                Gender: req.body.Gender,
                PhoneNo: req.body.PhoneNo,
                Email: req.body.Email,
                Password: password,
                ConfirmPassword: cpassword,
            })
           await registered.save()
        }
        else {
            res.status(404).send("Password Not matching")
        }
        res.redirect('/home');
    }
    catch (err) {
        res.status(404).send(err);
    }
})
app.get('/', (req, res) => {
    res.render('home');
})
app.get('/register', (req, res) => {
    res.render('register');
})
app.get('/home', (req, res) => {
    res.render('home');
})
app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login' , async (req, res) => {
    try {
     const email = req.body.email;
     const password = req.body.password;
     const findemail = await detail.findOne({Email:email})
     const isMatch = await bcrypt.compare(password, findemail.Password)
     if(isMatch)
     {
        res.render('detail',{user : findemail})
     }
     else
     {
        res.send("Enter valid details");
     }
        
    } catch (error) {
        console.log(error);
    } 
    
})
