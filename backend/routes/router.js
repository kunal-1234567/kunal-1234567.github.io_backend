const express = require('express')
const Router = express.Router();
const {register,login} = require('../controllers/auth.js')
const {addfriend} = require('../controllers/friends.js')
const {deleteAccount} = require('../controllers/delete_account.js') 
const {addExpense} = require('../controllers/expense.js')   
const {getFriends} = require('../controllers/friendcontroller.js')

const auth = require('../middlewares/authmiddleware.js');

Router.post('/register',register);
Router.post('/login',login);
Router.post("/friend",auth.verifyToken,addfriend);
Router.delete('/deleteacc',deleteAccount);
Router.post("/expense/add",addExpense)
Router.get("/friends/:ownerId",getFriends);




module.exports = Router;