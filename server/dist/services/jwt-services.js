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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerify = exports.jwtGenerator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWTSECRET;
const jwtGenerator = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const { rememberId } = loginData;
    // Cookie options
    const cookieOptions = {
        maxAge: rememberId ? Math.floor(Date.now() / 1000) + (60 * 60) : undefined, // Expire after 1 hour. Session or persisitent login status. 
        httpOnly: true, // Cookie will not be exposed to client side code
        sameSite: "none", // If client and server origins are different
        secure: true, // use with HTTPS only
        signed: false,
    };
    if (!jwtSecret || !loginData) {
        return { success: false, error: "No JWT Secret or Login data" };
    }
    const token = jsonwebtoken_1.default.sign(loginData, jwtSecret, { expiresIn: '3h' });
    if (!token)
        return { success: false, error: "No token generated" };
    try {
        const tokenOptions = { authToken: token, options: cookieOptions };
        return tokenOptions;
    }
    catch (err) {
        return { success: false, error: "Error generating token" };
    }
});
exports.jwtGenerator = jwtGenerator;
// JWToken verification
const jwtVerify = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (jwtSecret && token) {
            const verifiedUser = jsonwebtoken_1.default.verify(token, jwtSecret);
            const { email } = verifiedUser;
            return { success: true, message: "Token verified", user: email };
        }
    }
    catch (err) {
        console.error(err);
        return { success: false, error: "Token could not be verified" };
    }
});
exports.jwtVerify = jwtVerify;
