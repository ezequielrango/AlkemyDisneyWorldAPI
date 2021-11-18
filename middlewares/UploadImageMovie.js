const multer = require("multer");
const path = require("path");


//Upload image


const storage  =multer.diskStorage({
    destination : (req,file,cb) => {
       cb(null, path.join(__dirname,'../images'))
    },
    filename: (req,file,cb) => {
      const newFileName = `img-${Date.now()}${path.extname(file.originalname)}`; //nombre + fecha + extensión del archivo original
      cb(null, newFileName )
    }
  });

  const upload = multer({storage : storage});

module.exports = upload;