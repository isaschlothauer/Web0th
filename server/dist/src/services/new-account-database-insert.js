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
exports.newAccountDatabaseInsert = void 0;
const database_1 = require("../config/database");
const newAccountDatabaseInsert = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, passwordHash } = userData;
    // Value check on variables
    console.log(login, passwordHash);
    if (login === '' || passwordHash === '') {
        return false;
    }
    try {
        yield database_1.database.promise().query("INSERT IGNORE INTO users (login, password_hash) VALUES (?, ?);", [login, passwordHash]);
    }
    catch (err) {
        console.error(err);
        return err;
    }
});
exports.newAccountDatabaseInsert = newAccountDatabaseInsert;
