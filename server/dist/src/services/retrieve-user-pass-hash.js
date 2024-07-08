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
exports.retrieveUserPasswordHash = void 0;
const database_1 = require("../config/database");
const retrieveUserPasswordHash = (login) => __awaiter(void 0, void 0, void 0, function* () {
    const [passwordHash, _] = yield database_1.database.promise().query("SELECT password_hash FROM users WHERE login = ?;", [login]);
    return passwordHash[0].password_hash;
});
exports.retrieveUserPasswordHash = retrieveUserPasswordHash;
