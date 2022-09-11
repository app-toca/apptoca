import multer from 'multer';

const upload = multer({ storage: multer.diskStorage({
    destination: "uploads",
    filename: (request, file, callback) => {
      const filename = `${file.originalname}`
      return callback(null, filename)
    }})
})


export default upload