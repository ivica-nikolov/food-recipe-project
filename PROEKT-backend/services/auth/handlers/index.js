
const config = require("../../../pkg/config/index");
const accountRepo = require('../../../pkg/repo/account/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const {validate, validateCreateNewAccountRule, validateLoginRule} = require('../../../pkg/validators/validator');
const { jwt_secret_key: JWT_SECRET } = config.getConfigPropertyValue("security");


const login = async (request, response) => {
    try {
        await validate(request.body, validateLoginRule);
        
        let account = await accountRepo.findAccountByEmail(request.body.email);
        if (account == null) {
            throw {
                status: 404,
                message: 'User not found'
            };
        } 
        if (!bcrypt.compareSync(request.body.password, account.password)) {
            throw {
                status: 400,
                message: `Passwords don't match`
            }
        }
        const payloadData = {
            id: account._id,
            firstName: account.firstName,
            email: account.email
        };

        const encodedToken = jwt.sign(payloadData, JWT_SECRET);
        return response.status(200).send({ token: encodedToken , payloadData: payloadData});

    } catch (err) {
        return response.status(err.status).send(err.message);
    }
};

const register = async ({ body }, response) => {
    try {

        await validate(body, validateCreateNewAccountRule);
        
        let account = await accountRepo.findAccountByEmail(body.email);

        if (account != null) {
            throw {
                status: 400,
                message: 'User email already exists'
            };
        }

        body.password = bcrypt.hashSync(body.password);

        let result = await accountRepo.createAccount(body);

        return response.status(200).send({massage:'User successfully created!'});
    } catch (err) {
        return response.status(400).send({massage:'Email already exists'});
    }
};

const getProfileById = async (request, response) => {
    try {
        let profileData = await accountRepo.findAccountByID(request.params.id)
        
        
        return response.status(200).send(profileData);

    } catch (err) {
        return response.status(401).send(err.message);
    }
};


const DOCUMENTS_DIR = `${__dirname}/uploads`
const updateProfile = async(req, res) => {
    let fileTypes = ['image/png', 'image/jpg' , 'image/jpeg', 'image/svg'];
    console.log(req.body)
	
    const data = {
        firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		birthday: req.body.birthday,
		password: req.body.password,
		image: req.body.image
    }
    // if (!fileTypes.includes(req.body.image.mimetype)){
    //     return res.status(400).send('Error')
    // }

    try {
           

    await validate(req.body, validateCreateNewAccountRule);
    let account = await accountRepo.findAccountByEmail(req.body.email);

    if (account.lenght > 1){
        throw {
            status: 400,
            message: 'Email already exists'
        };  
        
    }

    data.password = bcrypt.hashSync(data.password);

    let result = await accountRepo.updateAccount(req.params.id, data)

        return res.status(200).send({massage:'User successfully updated!'});
    } catch (err) {
        return res.status(400).send({massage:'error'});
    }
};

module.exports = {
    login,
    register,
    updateProfile,
    getProfileById
}