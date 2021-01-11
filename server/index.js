const express = require('express')
var cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser');
const { resolveSoa } = require('dns');
const users = require('./Users')
const userRoute = require('./routes/api/users')
const app = express();
app.use(cors())
 

const PORT = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, (req, res)=>{
    console.log('server is running at port:', PORT)
})
// let users = [
//     {name:'Areeba',id:1,email:'areeba@gmail.com',password:'1111'},
//     {name:'Abeera',id:1,email:'abeera@gmail.com',password:'2222'}    
// ]


app.use(express.static(path.join(__dirname,'public')))

app.get('/signup', (req, res)=>{
    res.sendFile(path.join(__dirname, 'registration', 'signup.html'))
})
app.post('/signup',(req,res)=>{
   let {email, name, password} = req.body
   let found = users.some((item)=>item.email == email)
   if(found ){
    //    res.sendFile(path.join(__dirname, 'public', 'index.html'))
    res.redirect('/signup')
   } else{
       users.push({name,email,password,id:users.length+1})
       console.log(users)
       res.redirect('/login')
    
   }
 
 })


 app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname, 'registration', 'login.html'))
})
app.get('/about',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'about.html'))
})
app.post('/login',(req,res)=>{
    let {email,  password} = req.body
    let found = users.some((item)=>item.email == email && item.password == password)
console.log(found, req.body)
    if(found){
        // users.push({email,password,id:users.length+1})
        // res.sendFile(path.join(__dirname, 'registration','about.html'))
       res.redirect('/about')
    } else{
    //    res.sendFile(path.join(__dirname, 'registration','signup.html'))
    //    res.sendFile(path.join(__dirname, 'registration','signup.html'))
       res.redirect('/login')
    //    users.push({name,email,password,id:users.length+1})
    }
  })
  app.use('/api/users',userRoute)
//   console.log(users)
//   app.get('/api/users', (req,res)=>{
//       res.json(users)
//   })
//   app.get('/api/users/:id', (req,res)=>{
//       let id = req.params.id
//       console.log(id)
//       let result = users.filter((item)=>item.id == id)
//       res.json(result[0])
//   })
