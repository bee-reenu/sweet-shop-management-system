const express = require("express");
const router = express.Router();
const SweetController = require("../controllers/sweetsController");

router.get("/", SweetController.getAll);
router.post("/", SweetController.create);
router.put("/:id", SweetController.update);
router.delete("/:id", SweetController.delete);

module.exports = router;
