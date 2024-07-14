const express = require("express");
const jwt = require("jsonwebtoken");
const handler = require("express-async-handler");
const courseModel = require("../models/coursesModel");

const router = express.Router();

async function checksign(req, res, next) {
  const token = req.cookies["token"];
  if (token) {
    const user = jwt.verify(token, "alpha");
    req.user = user.user;
    next();
  } else {
    res.send("Log in Required");
  }
}

router.get(
  "/",
  checksign,
  handler(async (req, res) => {
    const courses = await courseModel.distinct("coursename", {
      userid: req.user.user._id,
    });
    res.json(courses);
  })
);
router.get(
  "/:name",
  checksign,
  handler(async (req, res) => {
    const courses = await courseModel.find({
      userid: req.user.user._id,
      coursename: req.params.name,
    });
    res.json(courses);
  })
);
router.get(
  "/del/:cname",
  handler(async (req, res) => {
    const result = await courseModel.deleteMany({
      coursename: req.params.cname,
    });
    res.json({ Status: "Success" });
  })
);

router.post(
  "/add",
  checksign,
  handler(async (req, res) => {
    const { coursename, courselink } = req.body;
    const course = await courseModel.create({
      userid: req.user.user._id,
      coursename,
      courselink,
    });
    res.send(course);
  })
);

module.exports = router;
