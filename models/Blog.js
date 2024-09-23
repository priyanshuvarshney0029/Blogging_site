const mongoose=require('mongoose')
const BlogSchema = new mongoose.Schema({
    name: {
        type:String,
        trim:true,
        required:true
    } , 
    title: {
        type: String,
        required: true // Ensuring the title is required
      },
      content: {
        type: String,
        required: true // Ensuring the content is required
      },
    img:{
        type:String,
        trim:true
    } ,
    desc: {
        type:String,
        trim:true
    }
})
let Blog = mongoose.model('Blog' , BlogSchema);
module.exports = Blog;