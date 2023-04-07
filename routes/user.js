const { signup, login, getLiked, mybooks } = require('../controller/user');
const authenticate = require('../middlware/auth');

const router = require('express').Router();

router.post("/signup", signup)

router.post("/login", login)

router.get("/liked", authenticate, getLiked)

router.get("/books", authenticate, mybooks)

module.exports = router