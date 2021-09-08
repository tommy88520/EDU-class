const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const extMap = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/../public/img");
  },
  filename: (req, file, cb) => {
    let ext = extMap[file.mimetype];
    cb(null, uuidv4() + ext);
  },
});
const fileFilter = (req, file, cb) => {
  cb(null, !!extMap[file.mimetype]);
};
const upload = multer({ storage, fileFilter });
module.exports = upload;
