const express = require("express");
const Users = require("../model/user.model");
const bcrypt = require("bcrypt");
const multer = require("multer");
const { uploadFile } = require("../helper/cloudinary");
const { sendEmail } = require("../helper/sendEmail");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + "-" + uniqueSuffix + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/create-account", async (req, res) => {
  try {
    const payload = req.body;
    // console.log(payload);
    const userExist = await Users.findOne({ email: payload.email });
    if (userExist) {
      return res.status(401).send({
        message: "Account already exists!",
      });
    }
    const hashedValue = bcrypt.hashSync(payload.password, 10);
    payload.hashedPassword = hashedValue;
    delete payload.password;
    new Users(payload)
      .save()
      .then((response) => {
        const emailSent = sendEmail(response.email);
        res.status(200).send({
          message: "User account created successfully",
          data: response,
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "User account creation failed",
          Error: error.message,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    // console.log("File uploaded:", req.file);
    if (!req.file) {
      return res.status(400).send({
        message: "No file uploaded",
      });
    }
    const upload = await uploadFile(req.file.path);
    // console.log("Cloudinary upload response:", upload);
    res.status(200).send({
      message: "File uploaded successfully",
      imageUrl: upload.secure_url,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      Error: error.message,
    });
  }
});

router.get("/send-email", async (req, res) => {
  try {
    const { email } = req.body;
    const sentEmail = await sendEmail(email);
    if (sentEmail) {
      return res.status(200).send({
        message: "Email sent successfully",
        data: data,
      });
    }
    res.status(403).send({
      message: "Failed to send the email.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error sending email/internal error",
      Error: error,
    });
  }
});

module.exports = router;
