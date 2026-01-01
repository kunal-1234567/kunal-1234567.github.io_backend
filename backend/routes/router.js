const express = require('express')
const Router = express.Router();
const {register,login} = require('../controllers/auth.js')
const {addfriend} = require('../controllers/friend.js')
const {deleteAccount} = require('../controllers/delete_account.js') 



Router.post('/register',register);
Router.post('/login',login);
Router.put("/friend",addfriend);
Router.delete('/deleteacc',deleteAccount);

module.exports = Router;