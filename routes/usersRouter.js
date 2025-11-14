const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');
const productModel=require('../models/product-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerUser, loginUser } = require('../controllers/authController');
const isLoggedin = require('../middlewares/isLoggedin');
const mongoose=require('mongoose');
const upload=require('../config/multer-config');


router.post('/register',registerUser);
router.post('/login',loginUser);

router.get('/cart',isLoggedin,async (req,res)=>{
     let user=await userModel.findOne({_id:req.user._id}).populate('cart.product');
     res.render('cart',{user})
});

router.get('/addToCart/:id', isLoggedin, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.redirect('/shop');

  let user = await userModel.findById(req.user._id); // fetch fresh from DB

  let exist = user.cart.find(item => item.product.toString() === id);
  if (exist) {
    exist.quantity += 1;
  } else {
    user.cart.push({ product: id, quantity: 1 });
  }

  await user.save();
  
  req.flash('success', 'Product added to cart successfully!');
  res.redirect('/shop');
});

router.get('/delete/:id',isLoggedin,async(req,res)=>{
      const id=req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) return res.redirect('/cart');
     const user = await userModel.findById(req.user._id);
     user.cart = user.cart.filter(item => item.product.toString() !== id);
     await user.save();
     res.redirect('/users/cart')
})

router.get('/profile',isLoggedin,(req,res)=>{
       
      let user=req.user;
       res.render('profile',{user});
});

router.get('/edit',isLoggedin,(req,res)=>{
       
      let user=req.user;
       res.render('editprofile',{user});
});


router.post('/edit',isLoggedin,upload.single('image'),async(req,res)=>{

     let {fullname,email,contact,image}=req.body;
     try{
          await userModel.findByIdAndUpdate(req.user._id,
            {
                  fullname,
                  email,
                  contact,
                  image:req.file.buffer
            },
            {new:true}
          )
         
          res.redirect('/users/profile');
     }catch(err){
         console.log('something wrong try again');
         res.redirect('/users/profile');
     }
});





module.exports = router;