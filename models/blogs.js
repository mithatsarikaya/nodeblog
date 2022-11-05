const mongoose = require('mongoose')
const Schema = mongoose.Schema

// şemamızı yaratıyoruz, tablomuzun değişkenlerini belirledik ve tiplerini yazdık. timestamps true ile zaman da tuttuk
const blogSchema = new Schema({
    title : {
        type:String,
        require: true
    },
    short : {
        type:String,
        require: true
    },
    long : {
        type:String,
        require: true
    }

}, {timestamps: true})


const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog