const multer = require("multer");
const path = require("path");


//Upload image


const storage  =multer.diskStorage({
    destination : (req,file,cb) => {
       cb(null, path.join(__dirname,'../images/movies'))
    },
    filename: (req,file,cb) => {
      const newFileName = `img-${Date.now()}${path.extname(file.originalname)}`; //name + date + file extension
      cb(null, newFileName )
    }
  });

  const upload = multer({storage : storage});

module.exports = upload;