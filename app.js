const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const adminRoutes = require('./routes/adminRoutes')
const blogRoutes = require('./routes/blogRoutes')
const authRoutes = require('./routes/authRoutes')
const {requireAuth, checkUser} = require('./middlewares/authMiddleware')


const app = express()

//npm i ejs yazdıktan sonra view engine olarka ejs'yi set ediyoruz
app.set('view engine', 'ejs')


// Bu sayede style.css dosyamız erişilebilir olacaktır, link yerinde public/ olarak belirtmemize gerek yok
app.use(express.static('public'))

// post metodu için bodyden datayı görüntülemeye çalıştığımızda olmadı, bununla olacak dendi yine olmadı lol
// ama boş da olsa bir obje döndü - edit html tarafında inputların içine 'name' eklememişim 
app.use(express.urlencoded({ extended: true}))

//cookie kontrolü içöin
app.use(cookieParser())

//* sayesinde checkUser middleware'inin her istekte çalışmasını sağlar
app.get('*',checkUser)

//bu baglantiyi mongodb'den aldık, bu sayede baglantı kuracak linkimiz oldu


const port = 4000

//mongoose 'u import ettikten sonra connect fonksiyonu sayesinde url i vererek bağlandık. Zaten then yapısından
//anlaşılacağı üzere bağlantı sağlanırsa serverımıza ilgili portu dinlemesini söyledik
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(port, console.log('it works')))
    .catch((err) => console.log(err))

// next sayesinde middleware çalıştıktan sonra program devam ediyor yoksa burda takılacaktı
app.use((req,res,next)=>{
    console.log(req.method)
    next()
})



//morgan paketini yükleyerek sayfanın ne kadar sürede yüklendiğiyle ilgili bilgi alabiliriz.
// app.use(morgan('dev'))

//bütün datay getir en son yazılan yazı ilk sırade gelsin
app.get('/', (req,res)=>{
    res.redirect('/blog')    
})


app.use('/admin',requireAuth , adminRoutes)

app.use('/blog', blogRoutes)

app.use('/', authRoutes)

//about 'a istek atana kadar çalışmaz 
app.use((req,res,next)=>{
    console.log(req.path)
    next()
})



app.get('/about', (req,res)=>{
    res.render('about', {title:'About'})
})


// app.get('/login', (req,res)=>{
//     res.render('login', {title:'Login Page'})
// })

app.get('/about-us', (req,res)=>{
    res.redirect('about')
})


app.use((req,res) => {
    res.status(404).render('404', {title:'Sayfa Bulunamadi'})
})











// /add url'ine istek attığımız zaman aşağıdaki yazıları veritabanına yazdırıoyuruz
/* app.get('/add', (req,res) =>{
    const blog = new Blog({
        title: 'yeni yazi 2',
        short: 'kisa aciklama',
        long: 'uzun aciklama'
    })

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })
}) */



// // bütün verileri getir
// app.get('/all', (req,res) => {
//     Blog.find()
//         .then((result) =>{
//             res.send(result)
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
// })


// //635e5bb0d334b696db787402 id li yazıyı getir
// app.get('/single', (req,res)=>{
//     Blog.findById('635e5bb0d334b696db787402')
//         .then((result) =>{
//             res.send(result)
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
// })
