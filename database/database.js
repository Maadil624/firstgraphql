const mongoose = require('mongoose')
let url = 'mongodb+srv://maadilleadsemantics:1234567890@user.dhannsv.mongodb.net/?retryWrites=true&w=majority'
const connectDB = async () => {
    try {
        conn = await mongoose.connect(url)
        console.log("connected to mongoDB.....")
    }
    catch (err) {
        console.log(`mongoDB err : ${err}`)
    }
}
module.exports = connectDB;