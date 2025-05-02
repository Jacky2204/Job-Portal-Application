import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "Uploads/")
    },
    filename: function (req, file, cb) { 
      cb(null,`${Date.now()}-${file.originalname}`) //file name

      // cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname)) //file name

    }
  })

 export const upload = multer({ storage: storage }) 