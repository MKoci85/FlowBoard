"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const AuthController_1 = require("../controllers/AuthController");
const validation_1 = require("../middleware/validation");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/register', (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'), (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email'), (0, express_validator_1.body)('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'), (0, express_validator_1.body)('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Passwords do not match');
    }
    return true;
}), validation_1.handleInputErrors, AuthController_1.AuthController.createAccount);
router.post('/verify-email', (0, express_validator_1.body)('token').notEmpty().withMessage('Token is required'), validation_1.handleInputErrors, AuthController_1.AuthController.verifyEmail);
router.post('/login', (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email'), (0, express_validator_1.body)('password').notEmpty().withMessage('Wrong password'), validation_1.handleInputErrors, AuthController_1.AuthController.login);
router.post('/request-code', (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email'), validation_1.handleInputErrors, AuthController_1.AuthController.requestConfirmationCode);
router.post('/forgot-password', (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email'), validation_1.handleInputErrors, AuthController_1.AuthController.forgotPassword);
router.post('/validate-code', (0, express_validator_1.body)('token').notEmpty().withMessage('Token is required'), validation_1.handleInputErrors, AuthController_1.AuthController.verifyCode);
router.post('/update-password/:token', (0, express_validator_1.param)('token').isNumeric().withMessage('Invalid Token'), (0, express_validator_1.body)('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'), (0, express_validator_1.body)('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Passwords do not match');
    }
    return true;
}), validation_1.handleInputErrors, AuthController_1.AuthController.updatePasswordWithToken);
router.get('/user', auth_1.authenticate, AuthController_1.AuthController.getUser);
/** Profile */
router.put('/profile', auth_1.authenticate, (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'), (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email'), validation_1.handleInputErrors, AuthController_1.AuthController.updateProfile);
router.post('/change-password', auth_1.authenticate, (0, express_validator_1.body)('current_password').notEmpty().withMessage('Current password is required'), (0, express_validator_1.body)('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'), (0, express_validator_1.body)('confirm_password').custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Passwords do not match');
    }
    return true;
}), validation_1.handleInputErrors, AuthController_1.AuthController.updateCurrentPassword);
router.post('/check-password', auth_1.authenticate, (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required'), validation_1.handleInputErrors, AuthController_1.AuthController.checkPassword);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map