"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_creation_controller_1 = __importDefault(require("../controllers/account-creation.controller"));
const login_controller_1 = __importDefault(require("../controllers/login.controller"));
const credential_controller_1 = __importDefault(require("../controllers/credential.controller"));
const new_account_validation_1 = require("../middlewares/new-account-validation");
const login_validation_1 = require("../middlewares/login-validation");
const verifier_controller_1 = __importDefault(require("../controllers/verifier.controller"));
const cookie_controller_1 = __importDefault(require("../controllers/cookie.controller"));
const api = (0, express_1.Router)()
    .use('/register', new_account_validation_1.newAccountValidation, account_creation_controller_1.default)
    .use('/login', login_validation_1.loginInputValidation, login_controller_1.default)
    .use('/userAuth', credential_controller_1.default)
    .use('/authVerifier', verifier_controller_1.default)
    .use('/cookies', cookie_controller_1.default);
exports.default = (0, express_1.Router)().use('/api', api);
