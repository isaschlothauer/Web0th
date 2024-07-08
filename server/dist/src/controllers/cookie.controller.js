"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.delete('/', (req, res) => {
    res.clearCookie('authenticationToken');
    res.end();
});
exports.default = router;
