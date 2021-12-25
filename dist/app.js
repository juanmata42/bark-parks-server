"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const passport_2 = __importDefault(require("./middleware/passport"));
const authUser_routes_1 = __importDefault(require("./routes/authUser.routes"));
const generic_routes_1 = __importDefault(require("./routes/generic.routes"));
// initialization
dotenv_1.default.config();
const app = (0, express_1.default)();
// settings
app.set('port', process.env.PORT || 3500);
// middlewares
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../../client/build/index.html'));
    });
}
app.get('/', (req, res) => res.send(`The API is at http://localhost:${app.get('port')}`));
app.use(auth_routes_1.default);
app.use(authUser_routes_1.default);
app.use(generic_routes_1.default);
exports.default = app;
