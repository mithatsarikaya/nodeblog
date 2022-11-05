const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
})

//pre = işlemden önce anlamında, içerde save'i belirttiğimiz için kaydetmeden önce diyelim.
// sonrasında yazdığımız fonksiyon bir middleware gibi çalıştığı için içerisinde next atadık
//this.password kullanıcın pass'ine eriştik. async ve await 'i javascript'in senkron çalışmasını bozmak için
//kullandık bu sayede fonskiyonumuz çalıştıktan sonra js çalışmaya devam edecek.
//Bunları models klasörümüzün altında users.js altında yazdık
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

//login işlemi başarılı mı değil mi onu kontrol ediyoruz
userSchema.statics.login = async function(username,password){
    const user = await this.findOne({username})
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }else{
            throw Error('parola hatali')
        }
    }else{
        throw Error('kullanici yok')
    }
}


const User = mongoose.model('user', userSchema)

module.exports = User