const jwt = require('jsonwebtoken');
const bcry = require('bcrypt');
const asyncHandler = require("express-async-handler");
const { user } = require("../models/user");
const { book } = require('../models/book');

const signup = asyncHandler(async (req, res) => {
    let { mail, password } = req.body;

    let exist = await user.findOne({ mail: mail });
    if (exist) throw new Error(JSON.stringify({ msg: "user already exist", field: "mail" }));

    // hash password
    let salt = await bcry.genSalt();
    let hash = await bcry.hash(password, salt);

    // store in db
    let newuser = new user({
        ...req.body,
        password: hash,
    })

    await newuser.save();

    // generating jwt 
    const encode = jwt.sign(newuser._id.valueOf(), process.env.JWT_SECRET);
    res.json({ success: true, msg: encode });
})

const login = asyncHandler(async (req, res) => {

    let { mail, password } = req.body;

    let find = await user.findOne({ mail: mail });
    if (!find) throw new Error(JSON.stringify({ msg: "user not found", field: "mail" }));

    // matching password

    let check = await bcry.compare(password, find.password);
    if (!check) throw new Error(JSON.stringify({ msg: "incorrect password", field: "password" }));
    // generating jwt 

    const encode = jwt.sign(find._id.valueOf(), process.env.JWT_SECRET);

    res.json({ success: true, msg: encode });
})

const getLiked = asyncHandler(async (req, res) => {
    let likedBooks = await user.findOne({ _id: req.user }).populate("liked");
    res.json(likedBooks)
})

const mybooks = asyncHandler(async (req, res) => {
    let books = await book.find({ user: req.user });
    res.json(books);
})

module.exports = { signup, login, getLiked, mybooks }