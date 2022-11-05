const Blog = require('../models/blogs')
const User = require('../models/users')

const adminIndex = (req,res) => {
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
        //resultta verilerimiz gelecek onu ejs'ye göndermek için blogs'a atadık
        res.render('admin', {title:'Admin', blogs:result})
    })
    .catch((err)=>{
        console.log(err);
    })
}

const adminUsers = (req,res) => {
    User.find()
    .then((result) => {
        res.render('adminUsers', {title:'Kullanıcılar', users:result})
    })
    
}

const adminAdd = (req,res) => {
    res.render('add', {title:'Yeni yazi'})
}

const adminAddPost = (req,res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            res.redirect('/admin')
        })
        .catch((err) => {
            console.log(err);
        })
}


const adminDelete = (req,res) => {
    const id = req.params.id
    console.log(id);

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({link:'/admin'})
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports ={
    adminIndex,
    adminAdd,
    adminAddPost,
    adminDelete,
    adminUsers
}