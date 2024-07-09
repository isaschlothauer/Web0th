"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_username_check_1 = require("../services/login-username-check");
const retrieve_user_pass_hash_1 = require("../services/retrieve-user-pass-hash");
const login_password_verification_1 = require("../services/login-password-verification");
const jwt_services_1 = require("../services/jwt-services");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, rememberId } = req.body;
    let login = [];
    // login account check 
    try {
        login = yield (0, login_username_check_1.loginUsernameCheck)(email);
    }
    catch (err) {
        return res.status(400).send({ success: false, error: "Unable to perform log in operation. Please try again later" });
    }
    // Database username check and rejection
    if (login.length === 0)
        return res.status(401).send({ success: false, error: "Invalid user name or password" });
    // Retrieving user password hash from the database
    const hashedUserPassword = yield (0, retrieve_user_pass_hash_1.retrieveUserPasswordHash)(email);
    let verified;
    // Verifying user password against user password hash
    try {
        verified = yield (0, login_password_verification_1.loginPasswordVerification)(password, hashedUserPassword);
    }
    catch (err) {
        return res.status(500).send({ success: false, error: "Unable to verify credentials. Please try again later" });
    }
    // Verification fail response
    if (!verified) {
        return res.status(401).send({ success: false, error: "Invalid user name or password" });
    }
    // Generate JWT
    const JWToken = yield (0, jwt_services_1.jwtGenerator)(req.body);
    if (!JWToken)
        return res.status(500).send({ success: false, error: "Unable to create session cookie" });
    if ('authToken' in JWToken) {
        const { authToken, options } = JWToken;
        // Setting session cookies
        res.cookie("authenticationToken", authToken, options);
        res.status(200).send({ success: true, message: "Log in successful" });
    }
}));
exports.default = router;
