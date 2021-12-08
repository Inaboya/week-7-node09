import Validator from "validator";
import { isEmpty } from "./is-empty";

export interface error {
  [key: string]: string;
}

export interface User {
  id: string;
  fullName: any;
  dateOfBirth: string;
  email: any;
  password: string;
}

export function validateRegisterInput(data: User) {
  let errors: error = {};

  data.fullName = !isEmpty(data.fullName) ? data.fullName : "";
  data.dateOfBirth = !isEmpty(data.dateOfBirth) ? data.dateOfBirth : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isLength(data.fullName, { min: 4, max: 30 })) {
    errors.fullName = "Full Name must be between 2 and 30 characters";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.fullName)) {
    errors.fullName = "Full Name field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isStrongPassword(data.password)) {
    errors.password =
      "Password must contain at least one number, one uppercase and one lowercase letter";
  }
    
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }


  return data;
}
