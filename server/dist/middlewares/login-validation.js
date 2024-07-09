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
exports.loginInputValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const loginInputValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const inputSchema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
        rememberId: joi_1.default.boolean().required()
    });
    try {
        const loginInput = yield inputSchema.validateAsync(req.body, { abortEarly: false });
        next();
    }
    catch (err) {
        return res.status(400).json({ error: err });
    }
});
exports.loginInputValidation = loginInputValidation;
