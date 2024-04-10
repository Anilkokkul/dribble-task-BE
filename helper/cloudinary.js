const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadFile = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    // console.log("Upload response:::", result);
    return result;
  } catch (error) {
    console.log("Error Message::", error.message);
  }
};

module.exports = {
  uploadFile,
};
