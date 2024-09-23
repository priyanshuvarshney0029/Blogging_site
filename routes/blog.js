const express = require('express');
const Blog=require('../models/Blog')
const router=express.Router() // mini instance..

// to show all the blogs
router.get('/blogs',async(req,res)=>{
    let blogs=await Blog.find({});
    res.render('blogs/index',{blogs})
})
// to show the form for new product
router.get('/blog/new' , (req,res)=>{
    res.render('blogs/new');
})
// to actually add the product
router.post('/blogs' , async(req,res)=>{
    let { name, title, content, img, desc } = req.body;
    await Blog.create({name , title, content ,img, desc})
    res.redirect('/blogs');
})
// to show a particular product
router.get('/blogs/:id' , async(req,res)=>{
    let {id} = req.params;
    let foundProduct = await Blog.findById(id);
    res.render('blogs/show' , {foundProduct})
})
// form to edit the product
router.get('/blogs/:id/edit' , async(req,res)=>{
    let {id} = req.params;
    let foundProduct = await Blog.findById(id);
    res.render('blogs/edit' , {foundProduct})
})
// to actually edit the data in db
router.patch('/blogs/:id' , async(req,res)=>{
    let {id} = req.params;
    let { name, title, content, img, desc } = req.body;
    await Blog.findByIdAndUpdate( id , {name, title, content, img, desc }  )
    res.redirect(`/blogs/${id}`);
})

// to delete a product
router.delete('/blogs/:id' , async(req,res)=>{
    let {id} = req.params;
    await Blog.findByIdAndDelete(id);
    res.redirect('/blogs');
})
module.exports = router;