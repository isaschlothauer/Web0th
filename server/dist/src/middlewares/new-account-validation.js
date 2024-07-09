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
exports.newAccountValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const newAccountValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("This is from a middleware:", req.body);
    const schema = joi_1.default.object({
        email: joi_1.default.string().required()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'jp', 'de', 'gov', 'edu'] }
        }),
        password: joi_1.default.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .min(5)
            .max(32)
            .required()
            .messages({
            "string.min": "Password must be minimum 5 characters",
            "string.max": "Password must be less than 32 characters"
        }),
        passwordConfirm: joi_1.default.ref('password')
    });
    try {
        const value = yield schema.validateAsync(req.body, { abortEarly: false });
        // Removing passwordConfirm
        delete req.body['passwordConfirm'];
        next();
    }
    catch (err) {
        const errorDetails = err.details.map((detail) => detail.message);
        return res.status(400).json({ errors: errorDetails });
    }
});
exports.newAccountValidation = newAccountValidation;
