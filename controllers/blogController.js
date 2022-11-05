const Blog = require('../models/blogs')

const blogIndex = (req,res)=>{
    Blog.find().sort({createdAt: -1})
        .then((result)=>{
            //resultta verilerimiz gelecek onu ejs'ye göndermek için blogs'a atadık
            res.render('index', {title:'Ana Sayfa', blogs:result})
        })
        .catch((err)=>{
            console.log(err);
        })
}


const blogId = (req,res) => {
    const id = req.params.id
    
    Blog.findById(id)
        .then((result)=>{
            res.render('blog', {blog:result, title:'Detay'})
        })
        .catch((err) => {
            res.status(404).render('404', {title:'Sayfa Bulunamadi'})        
        })
}


module.exports = {
    blogIndex,
    blogId
}