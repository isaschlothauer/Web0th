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
const jwt_services_1 = require("../services/jwt-services");
// Checks credential when the landing page is visited. 
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userToken = '';
    try {
        const verified = yield (0, jwt_services_1.jwtVerify)(req.cookies['authenticationToken']);
        // Verification response
        if (verified == undefined)
            return res.status(400).send({ success: false, error: "Not authenticated" });
        else if (verified.success === false)
            return res.status(401).send(verified);
        else
            return res.status(200).send(verified);
    }
    catch (err) {
        return res.status(500).send({ success: false, error: "Unable to perform login status verification" });
    }
}));
exports.default = router;
