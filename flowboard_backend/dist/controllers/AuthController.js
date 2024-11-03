"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../utils/auth");
const token_1 = require("../utils/token");
const Token_1 = __importDefault(require("../models/Token"));
const AuthEmail_1 = require("../emails/AuthEmail");
const jwt_1 = require("../utils/jwt");
class AuthController {
    static createAccount = async (req, res) => {
        try {
            const { password, email } = req.body;
            const userExists = await User_1.default.findOne({ email });
            if (userExists) {
                res.status(400).json({ message: 'User email already exists' });
                return;
            }
            // Create user
            const user = new User_1.default(req.body);
            // Hash password
            user.password = await (0, auth_1.hashPassword)(password);
            // Create token
            const token = new Token_1.default();
            token.token = (0, token_1.generateToken)();
            token.user = user.id;
            // Send email
            AuthEmail_1.AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token
            });
            await Promise.allSettled([user.save(), token.save()]);
            res.send('User created successfully, check your email for verification');
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    static verifyEmail = async (req, res) => {
        try {
            const { token } = req.body;
            const tokenExists = await Token_1.default.findOne({ token });
            if (!tokenExists) {
                res.status(404).json({ message: 'Invalid token' });
                return;
            }
            const user = await User_1.default.findById(tokenExists.user);
            if (!user) {
                res.status(404).json({ message: 'Invalid token' });
                return;
            }
            user.confirmed = true;
            await Promise.allSettled([user.save(), tokenExists.deleteOne()]);
            res.send('Email verified successfully');
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    static login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User_1.default.findOne({ email });
            if (!user) {
                res.status(400).json({ message: 'User not found' });
                return;
            }
            if (!user.confirmed) {
                const token = new Token_1.default();
                token.user = user.id;
                token.token = (0, token_1.generateToken)();
                await token.save();
                AuthEmail_1.AuthEmail.sendConfirmationEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token
                });
                res.status(404).json({ message: 'Email not verified' });
                return;
            }
            const isPasswordValid = await (0, auth_1.comparePassword)(password, user.password);
            if (!isPasswordValid) {
                res.status(404).json({ message: 'Wrong password' });
                return;
            }
            const token = (0, jwt_1.generateJWT)({ id: user.id });
            res.send(token);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    static requestConfirmationCode = async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User_1.default.findOne({ email });
            if (!user) {
                res.send('If your email is registered, you will receive a confirmation code');
                return;
            }
            if (user.confirmed) {
                res.status(403).json({ message: 'User already verified' });
                return;
            }
            // Create token
            const token = new Token_1.default();
            token.token = (0, token_1.generateToken)();
            token.user = user.id;
            // Send email
            AuthEmail_1.AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token
            });
            await Promise.allSettled([user.save(), token.save()]);
            res.send('If your email is registered, you will receive a confirmation code');
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    static forgotPassword = async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User_1.default.findOne({ email });
            if (!user) {
                res.send('If your email is registered, you will receive a password reset code');
                return;
            }
            // Create token
            const token = new Token_1.default();
            token.token = (0, token_1.generateToken)();
            token.user = user.id;
            await token.save();
            // Send email
            AuthEmail_1.AuthEmail.sendPasswordResetToken({
                email: user.email,
                name: user.name,
                token: token.token
            });
            res.send('If your email is registered, you will receive a password reset code');
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    static verifyCode = async (req, res) => {
        try {
            const { token } = req.body;
            const tokenExists = await Token_1.default.findOne({ token });
            if (!tokenExists) {
                res.status(404).json({ message: 'Invalid token' });
                return;
            }
            res.send('Code verified successfully, set your new password');
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    static updatePasswordWithToken = async (req, res) => {
        try {
            const { token } = req.params;
            const tokenExists = await Token_1.default.findOne({ token });
            if (!tokenExists) {
                res.status(404).json({ message: 'Invalid token' });
                return;
            }
            const user = await User_1.default.findById(tokenExists.user);
            user.password = await (0, auth_1.hashPassword)(req.body.password);
            await Promise.allSettled([user.save(), tokenExists.deleteOne()]);
            res.send('Password updated successfully');
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    static getUser = async (req, res) => {
        res.json(req.user);
    };
    static updateProfile = async (req, res) => {
        const { name, email } = req.body;
        const userExists = await User_1.default.findOne({ email });
        if (userExists && userExists.id.toString() !== req.user.id.toString()) {
            res.status(409).json({ message: 'Email already in use' });
            return;
        }
        req.user.name = name;
        req.user.email = email;
        try {
            await req.user.save();
            res.send('Profile updated successfully');
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    static updateCurrentPassword = async (req, res) => {
        const { current_password, password } = req.body;
        const user = await User_1.default.findById(req.user.id);
        const isPasswordValid = await (0, auth_1.comparePassword)(current_password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Wrong password' });
            return;
        }
        try {
            user.password = await (0, auth_1.hashPassword)(password);
            await user.save();
            res.send('Password updated successfully');
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    static checkPassword = async (req, res) => {
        const { password } = req.body;
        const user = await User_1.default.findById(req.user.id);
        const isPasswordValid = await (0, auth_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Wrong password' });
            return;
        }
        res.send('Password is correct');
    };
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map