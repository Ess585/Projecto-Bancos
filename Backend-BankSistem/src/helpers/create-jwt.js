const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;

const generateJWT = async(uId, name, email) =>{
    const payload = {uId, name, email};
    try{
        const token = await jwt.sign(payload, secret, {
            expiresIn: '24h'
        });
        return token;
    }catch(error){
        throw new Error(Error + 'Error al generar el Token.');
    }
}

module.exports = { generateJWT };