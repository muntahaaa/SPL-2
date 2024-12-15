require('dotenv').config({ path: `${process.cwd()}/.env` });
const bcrypt= require('bcrypt');
const user = require('../db/models/user');
const jwt= require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');

const generateToken = (payload) => {
 return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
};

const SignUp = catchAsync(async(req, res, next) => { 
    const body= req.body;

    if(!['admin','staff','visitor'].includes(body.userType)){
        throw new Error('Invalid user type', 400);
    }


    const newUser= await user.create({
        userType: body.userType,
        Username: body.Username,
        Email: body.Email,
        Password: body.Password,
        FullName: body.FullName,
        RoleID: body.RoleID,
        confirmPassword: body.confirmPassword
    });

    if(!newUser){
        throw new Error('Failed to create new User', 500);
    }

    const result= newUser.toJSON();
    delete result.Password;
    delete result.deletedAt;
   
    result.token= generateToken({
     id: result.id,
    });

  
    return res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        data: result
    });      
});

const login= catchAsync(async(req, res, next) => {
 const {Email, Password}= req.body; 

 if(!Email || !Password){
    throw new Error('Email and password are required', 400);
 }
 const result = await user.findOne({where: {Email}});
 if(!result || !(await bcrypt.compare(Password, result.Password))){
    throw new Error('User not found. Check your email and password', 401);
    
 }

 const token= generateToken({
        id: result.id
    });

    return res.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        data: {token}
    });

});

module.exports = {SignUp, login};
