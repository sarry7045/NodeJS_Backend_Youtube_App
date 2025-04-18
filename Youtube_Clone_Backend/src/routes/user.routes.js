import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    { name: "coverImage", maxCount: 1 },
  ]),
  // Middleware Inject , Just Before registerUser
  registerUser
);

router.route("/login").post(loginUser);

// Secured Routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refreshToken").post(verifyJWT, refreshAccessToken);

export default router;
