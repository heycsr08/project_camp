import { Router } from "express";
import { changeCurrentPassword, forgotPasswordRequest, getCurrentUser, login, logoutUser, refreshAccessToken, registerUser, resendEmailVerification, resetForgotPassword, verifyEmail } from "../controller/auth.controller.js"
import { validate } from "../middleware/validator.middleware.js"
import { userForgotPasswordValidator, userLoginValidator, userRegistrationValidator, userResetForgotPassswordValidator } from "../validators/index.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

//unsecured routes(doesnot required jwt)
router.route("/register").post(userRegistrationValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, login);
router.route("/verify-email/:verficationToken").get(verifyEmail);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-password").post(userForgotPasswordValidator(), validate, forgotPasswordRequest);
router.route("/reset-password/:resetToken").post(userResetForgotPassswordValidator(), validate, resetForgotPassword);

//secure routes

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").post(verifyJWT, getCurrentUser);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/resend-email-verification").post(verifyJWT, resendEmailVerification);

export default router
