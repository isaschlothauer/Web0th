"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./src/config/database");
const cors_1 = __importDefault(require("cors"));
const cors_2 = require("./src/config/cors");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./src/routes/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(cors_2.corsOptions));
app.use(express_1.default.json());
const port = parseInt(process.env.B_PORT || "5001");
const f_port = parseInt(process.env.F_PORT || "3001");
// Database connection attempts
database_1.database.getConnection((err, connection) => {
    if (err) {
        throw err;
        process.exit(1);
    }
    else {
        console.log("Database connection established");
        connection.release();
    }
});
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
app.get("/", (req, res) => {
    res.send("<h1>This is a test</h1><div>This is a container</div><div>This is a content</div><div>This is the second content</div>");
});
// app.use("/userRoutes", userRoutes);
app.use(routes_1.default);
