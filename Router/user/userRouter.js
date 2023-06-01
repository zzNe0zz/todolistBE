const express = require("express")
const router = express.Router()
const multer  = require('multer')
const path = require("path")
const {creatUser, login, getAlluser, profile, upAvatar} = require("../../Controller/User/userController")
const { checkRole, checkToken } = require("../../Setting/CheckUser")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./Public/Img")
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+ext
      console.log(uniqueSuffix);
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  const upload = multer({ storage: storage })

router.post("/creatUser",creatUser)
router.post("/login",login)

router.get("/getalluser",checkRole,getAlluser)

router.get("/profile",checkToken,profile)
router.post("/profile/avatar",upload.single("avatar"),upAvatar)
module.exports = router