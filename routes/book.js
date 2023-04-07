const { getbooks,
    getOneBook,
    addbook,
    dltbook,
    updatebook,
    toggleLike
} = require('../controller/book');
const multer = require('multer');
const authenticate = require('../middlware/auth');
const upload = multer({ dest: 'images/' })
const router = require('express').Router();

router.get("/", getbooks)

router.get("/:id", getOneBook)

router.post("/", authenticate, upload.single('image'), addbook)

router.delete("/:id", authenticate, dltbook)

router.put("/:id", authenticate, upload.single('image'), updatebook)

router.get("/like/:id", authenticate, toggleLike);

module.exports = router