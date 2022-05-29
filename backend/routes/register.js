const express = require("express");
const Mentor = require("../models/Mentor");
const Mentee = require("../models/Mentee");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

// ROUTE 2: Add a new note using: POST "/api/notes/addnote". Login required.
router.post("/registermentor", fetchuser, async (req, res) => {
  // If there are errors return bad requests and the errors.
  let success = false;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }

    const mentor = new Mentor({
      id: req.user.id,
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      mobile: req.body.mobile,
      email: req.user.email,
      qualification: req.body.qualification,
      category: req.body.category,
      about: req.body.about,
    });
    console.log(mentor);
    const savedMentor = await mentor.save();
    success = true;
    req.user.isDetail = true;
    res.json({ success, savedMentor });
  } catch (error) {
    success = false;
    console.error(error.message);
    res.status(500).send(success, "Some error occurred");
  }
});

module.exports = router;
