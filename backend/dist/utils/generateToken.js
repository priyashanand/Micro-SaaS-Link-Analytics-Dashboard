"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
};
exports.generateToken = generateToken;
