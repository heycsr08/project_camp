import { User } from "../models/user.model"
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

const generateAccessAb
const registerUser = asyncHandler(async (req, res) => {

    //taking data from the body
    const { email, username, password, role } = req.body;


    // find the user in database ie if already exist ?
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "user with email/username already exists", []);
    }

    //creating new user to store in the datbase
    const user = await User.create({
        email,
        username,
        password,
        isEmailVerified = false,
    })

    const { unhashedToken, hashedToken, tokenExpiry } = user.generateTemproraryToken()
})