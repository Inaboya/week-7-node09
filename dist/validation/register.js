"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegisterInput = void 0;
const validator_1 = __importDefault(require("validator"));
const is_empty_1 = require("./is-empty");
function validateRegisterInput(data) {
    let errors = {};
    data.fullName = !(0, is_empty_1.isEmpty)(data.fullName) ? data.fullName : "";
    data.dateOfBirth = !(0, is_empty_1.isEmpty)(data.dateOfBirth) ? data.dateOfBirth : "";
    data.email = !(0, is_empty_1.isEmpty)(data.email) ? data.email : "";
    data.password = !(0, is_empty_1.isEmpty)(data.password) ? data.password : "";
    if (validator_1.default.isLength(data.fullName, { min: 4, max: 30 })) {
        errors.fullName = "Full Name must be between 2 and 30 characters";
    }
    if (!validator_1.default.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (validator_1.default.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    if (validator_1.default.isEmpty(data.fullName)) {
        errors.fullName = "Full Name field is required";
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (validator_1.default.isStrongPassword(data.password)) {
        errors.password =
            "Password must contain at least one number, one uppercase and one lowercase letter";
    }
    if (!validator_1.default.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    return data;
}
exports.validateRegisterInput = validateRegisterInput;
//# sourceMappingURL=register.js.map