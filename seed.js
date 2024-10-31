const mongoose=require('mongoose')
const Blog=require('./models/Blog')
const blogs=[
    {
        name:"Priyanshu",
        title:"Coding",
        content:"coding is best..",
        img:"https://images.unsplash.com/file-1715714098234-25b8b4e9d8faimage?w=416&dpr=2&auto=format&fit=crop&q=60",
        desc:"alfhalfa"

    },
    {
        name:"Rahul",
        title:"BCA",
        content:"Business is something which can change our lifeee",
        img:"https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D",
        desc:"hhhlala"

    },
    {
        name:"dev",
        title:"dfalfajl",
        content:"fakjalfaj",
        img:"https://plus.unsplash.com/premium_photo-1683211783920-8c66ab120c09?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D",
        desc:"lafalkf"

    },
    {
        name:"Lavlesh",
        title:"alfdja",
        content:"flasjflaf",
        img:"https://images.unsplash.com/photo-1496449903678-68ddcb189a24?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D",
        desc:"fklafalfj"

    }
]
async function seedDB(){
    // await Blog.deleteMany({})
    await Blog.insertMany(blogs);
    console.log("data seeded successfully")
}
module.exports=seedDB;