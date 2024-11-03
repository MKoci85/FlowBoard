"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const colors_1 = __importDefault(require("colors"));
const connectDB = async () => {
    try {
        const connection = await mongoose_1.default.connect(process.env.DATABASE_URL);
        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(colors_1.default.white.bgGreen.bold(`Connected to MongoDB at ${url}`));
    }
    catch (error) {
        console.log(colors_1.default.white.bgRed.bold('Error connecting to MongoDB'));
        process.exit(1);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=db.js.map