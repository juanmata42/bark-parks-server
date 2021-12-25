"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const dbOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    user: config_1.default.DB.USER,
    pass: config_1.default.DB.PASSWORD,
};
const { NODE_ENV } = process.env;
const uri = NODE_ENV === 'test' ? config_1.default.DB.URI_TEST : config_1.default.DB.URI;
mongoose_1.default.connect(uri, dbOptions);
const { connection } = mongoose_1.default;
connection.once('open', () => {
    console.log('Mongodb Connection stablished');
});
connection.on('error', (err) => {
    console.log('Mongodb connection error:', err);
    process.exit();
});
