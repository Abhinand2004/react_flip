import { Router } from "express";
import Auth from './authentication/auth.js';

import * as rh from './reqhandler.js'

const router=Router();
router.route('/adduser').post(rh.addUser)
router.route('/login').post(rh.login)
router.route('/verify').post(rh.verifyEmail)
router.route("/display").get(Auth,rh.display)
router.route("/addprofile").post(rh.addprofile)
router.route("/update/:id").put(rh.update)
router.route("/deleteuser").delete(Auth,rh.deleteuser)

router.route("/postadd").post(Auth,rh.addphotos)
router.route("/displayphotos").get(Auth,rh.displayphotos)
router.route("/homepage").get(rh.homepagedisplay)

export default router