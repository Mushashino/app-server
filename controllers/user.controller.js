const bcrypt = require('bcrypt');
const _ = require('lodash');
const axios = require('axios');
const otpGenerator = require('otp-generator');

const { User } = require('../models/user.model');
const { Otp } = require('../models/otp.model');

module.exports.signUp = async (req, res) => {
    const user = await User.findOne({ number: req.body.number });
    if(user) return res.status(400).send('User already registered!');

    

    const OTP = otpGenerator.generate(4, { digits: true, alphabets: false,lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false });

    const number = req.body.number;
    const name = req.body.name;

    console.log(OTP);

    const otp = new Otp({
        name: name,
        number: number,
        otp: OTP
    });

    

    // cosnt messagebird = require('messagebird')('532WMkHslzjdLzCbVFsnxsGFC');

    // const params = {
    //   'originator': 'Mushashino',
    //   'recipients': [
    //     '+243842613999'
    // ],
    //   'body': 'Code de vérification : '+OTP
    // };

    // messagebird.messages.create(params, function (err, response) {
    //   if (err) {
    //     return console.log(err);
    //   }
    //   console.log(response);
    // });

    const salt = await bcrypt.genSalt(10);
    otp.otp = await bcrypt.hash(otp.otp, salt);
    const result = await otp.save();
    return res.status(200).send("OTP Send Successfully");
    

} 

module.exports.verifyOtp = async(req, res) =>{

    const otpHolder = await Otp.find({ 
        number: req.body.number 
    }); 
    if(otpHolder.length === 0) return res.status(400).send('You use an Expired OTP');
    const rightOtpFind = otpHolder[otpHolder.length - 1];
    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
    
    if(rightOtpFind.number === req.body.number && validUser) {
        const user = new User(_.pick(req.body, ['number', 'name']));
        const token = user.generateJWT(); 
        const result = await user.save();
        const OTPDelete = await Otp.deleteMany({ number: rightOtpFind.number });
        return res.status(200).send({
            message: 'User Registration Successfully',
            token: token,
            data: result
        }); 
    }else{
        return res.status(400).send('Your OTP is Wrong');
    }
 
    
}

module.exports.login = async(req, res) =>{

    const user = await User.findOne({ number: req.body.number, name: req.body.name });
    const userToken = new User(_.pick(req.body, ['number', 'name']));
    if (user) {
        const token = userToken.generateJWT(); 
        res.status(200).send({
            message: 'User login Successfully',
            token: token,
            data: req.body
    });
        
    } else {
        return res.status(400).send('User not found!');
        
    }

 
    
}


module.exports.hello = async(req, res) =>{

    return res.status(200).send('Mushashino API');
}