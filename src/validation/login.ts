import Validator from "validator";
import { isEmpty } from "./is-empty";

interface error {
  [key: string]: string;
}

export interface User {
  id: string;
  fullName: any;
  dateOfBirth: string;
  email: any;
  password: string;
  password2: string;
}


export function validateLoginInput(data: User) {
  let errors: error = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if(Validator.isEmpty(data.email)){
    errors.email = "Email field is required";
  }

  if(!Validator.isLength(data.password, {min: 6, max: 30})){
    errors.password = "Password must be at least 6 characters";
  }

  if(Validator.isEmpty(data.password)){
    errors.password = "Password field is required";
  }

  return {
      errors,
      isValid: isEmpty(errors)
  }
}
