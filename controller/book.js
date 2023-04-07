const asyncHandler = require("express-async-handler");
const { book } = require("../models/book");
const { user } = require("../models/user");

const getbooks = asyncHandler(async (req, res) => {
    let books = await book.find().sort("-createdAt");
    res.json(books);
})

const getOneBook = asyncHandler(async (req, res) => {
    let { id } = req.params;
    let oneBook = await book.findOne({ _id: id }).populate({
        path: "user",
        select: "name phoneno address mail"
    });
    res.json(oneBook);
})

const addbook = asyncHandler(async (req, res) => {

    let body = JSON.parse(JSON.stringify(req.body));

    if (req.file) {
        body['image'] = req.file.filename;
    }
    let newbook = new book({
        ...body,
        user: req.user,
    });
    await newbook.save();
    res.json(newbook);
})

const dltbook = asyncHandler(async (req, res) => {
    let { id } = req.params;
    let deleted = await book.findOneAndDelete({ _id: id });
    res.json({ msg: id });
})

const updatebook = asyncHandler(async (req, res) => {
    let { id } = req.params;

    let body = JSON.parse(JSON.stringify(req.body));
    let obj = {
        name: body.name,
        price: body.price,
        author: body.author
    }

    if (req.file) {
        obj['image'] = req.file.filename;
    }

    let newbook = await book.findOneAndUpdate({ _id: id }, obj, { new: true })
    res.json(newbook);
})

const toggleLike = asyncHandler(async (req, res) => {
    let { id } = req.params;
    let check = await user.findOne({ _id: req.user });
    console.log(id)
    let f = check.liked.find((ch) => toString(ch) == id);
    console.log(f)
    if (f) {
        // remove from like 
        let newuser = await user.findOneAndUpdate({ _id: req.user }, {
            $pull: { liked: id }
        }, { new: true })
    } else {
        // add to like 
        let newuser = await user.findOneAndUpdate({ _id: req.user }, {
            $push: { liked: id }
        }, { new: true })
    }
    res.json({ msg: id })
})

module.exports = {
    getOneBook,
    getbooks,
    addbook,
    dltbook,
    updatebook,
    toggleLike,
}