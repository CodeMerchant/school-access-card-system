import express from "express";
import userCtrl from "../controllers/admin.controller";
import adminCtrl from "../controllers/createadmin.controller";
import authCtrl from "../controllers/adminauth.controller";

const router = express.Router();

router.route("/api/users").get(userCtrl.list).post(userCtrl.create);
router.route("/api/admins").get(adminCtrl.list).post(adminCtrl.create);

router
	.route("/api/users")
	.get(/*authCtrl.requireSignin,*/ userCtrl.read)
	.put(/*authCtrl.requireSignin, authCtrl.hasAuthorization,*/ userCtrl.update)
	.delete(
		/*authCtrl.requireSignin, authCtrl.hasAuthorization,*/ userCtrl.remove
	);

router.param("userId", userCtrl.userByID);

export default router;
