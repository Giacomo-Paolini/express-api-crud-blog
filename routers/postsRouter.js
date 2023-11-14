const express = require("express");
const router = express.Router();
const postsController = require('../controllers/postsController');
const multer = require("multer");

router.get("/", postsController.index);
router.get("/create", postsController.create);
router.get("/:slug", postsController.show);
router.get("/:slug/download", postsController.download);

router.post("/", multer().none(), postsController.store);
router.post("/:slug", postsController.destroy);

module.exports = router;