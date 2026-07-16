import { Router } from "express";
import * as userCtrl from '../controllers/user.controller'

const router = Router();

// console.log("User router is loaded!");
router.post('/', userCtrl.register)
router.post('/login', userCtrl.login);

export default router;