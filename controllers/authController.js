 const bcrypt=require('bcrypt');
 const generateToken=require('../utils/generateToken');
 const userModel=require('../models/user-model');
 const jwt=require('jsonwebtoken')

module.exports.registerUser= async (req, res) => {
      try {
            let { fullname, email, password } = req.body;
            const user= await userModel.findOne({email:email});
            if(user){
                  return res.status(409).send('user already exists')
            }


            bcrypt.genSalt(10, (err, salt) => {

                  bcrypt.hash(password, salt, async (err, hash) => {
                        if (err) res.send(err.message);
                        else {
                              let createdUser = await userModel.create({
                                    email,
                                    password: hash,
                                    fullname,
                              });

                              let token = generateToken(createdUser);
                              res.cookie('token', token);
                             res.redirect('/shop');
                        }
                  })
            })



      } catch (err) {
            res.send(err.message);
      }
}

module.exports.loginUser = async(req,res)=>{
      let {email,password}=req.body;
      let user= await userModel.findOne({email:email});
      
      if(!user) {
            req.flash('error',"Email or Password incorrect");
            return res.redirect('/login');
      }

      const isMatch= await bcrypt.compare(password,user.password);

      if(!isMatch)  {
            req.flash('error',"Email or Password incorrect");
            return res.redirect('/login');
      }

      let token=generateToken(user);
      res.cookie('token',token);
      res.redirect('/shop')


};