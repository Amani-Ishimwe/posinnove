const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('config')
const Joi = require('joi')
const debug = require('debug')('app:userController')

const userSchema = Joi.object({
    Name: Joi.string().min(3).max(30).required(),
    Email: Joi.string().email().required(),
    Password: Joi.string().min(6).max(1024).required()
})

exports.register = async (req, res) => {
    try{
        const {Name, Email , Password} = req.body;
        const existingUser = await User.findOne({Email})
        if(existingUser){
            return res.status(409).json({message:'User Already Exists'})
        }
        const hashedPassword = await bcrypt.hash(Password,10)
        const newUser = new User({
            Name,
            Email,
            Password: hashedPassword
        })
                const { Password: userPassword, ...savedUser } = newUser;
                console.log(savedUser)

                await newUser.save();
                const token = jwt.sign({id:newUser._id}, config.get('jwtSecret'), { expiresIn: '24h' });
                return res.status(201).send({newUser: savedUser , token})

    }catch(error){
        console.log(error)
         res.status(500).json({ message: 'Error registering user' });
    }
}

exports.login = async (req,res)=>{
    try{
        const {Email,Password} = req.body;
         // Find the  user
       const user = await User.findOne({ Email})
     if(!user || !await bcrypt.compare(Password,user.Password)){
      return res.status(400).json({message:"Invalid credentials"})
     }
      const token = jwt.sign({id:user._id},config.get('jwtSecret'),{expiresIn:'1h'})
      res.status(200).json({ 
            token, 
            user: { 
              id: user._id, 
              Name: user.Name, 
              Email: user.Email
            } 
          })
    }catch(error){
        return res.status(500).json({message:'Internal Server Error'})
    }
}

exports.logout = (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
