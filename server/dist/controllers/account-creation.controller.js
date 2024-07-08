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
const password_hashing_1 = require("../services/password-hashing");
const login_duplicate_check_1 = require("../services/login-duplicate-check");
const new_account_database_insert_1 = require("../services/new-account-database-insert");
const router = (0, express_1.Router)();
// Account creation 
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let users = [];
    // Check existing user with same login
    try {
        users = yield (0, login_duplicate_check_1.loginDuplicateCheck)(email);
    }
    catch (err) {
        res.status(400).send({ sucess: false, error: err.message });
        return;
    }
    if (users.length > 0) {
        res.status(409).send({ success: false, error: "Account already exists" });
        return;
    }
    // Password hash
    const passwordHash = yield (0, password_hashing_1.hashPassword)(password);
    // Data for database function
    const userDataPrepared = {
        login: email,
        passwordHash: passwordHash
    };
    // Database insertion
    const databaseInsertResult = yield (0, new_account_database_insert_1.newAccountDatabaseInsert)(userDataPrepared);
    if (databaseInsertResult === false)
        return res.status(400).send({ success: false, error: "Error. Unable to create a new account" });
    else
        return res.status(201).send({ success: true, message: "New account created" });
}));
exports.default = router;
