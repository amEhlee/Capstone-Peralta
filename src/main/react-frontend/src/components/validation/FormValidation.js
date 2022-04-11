import {validEmail, validPassword, validPostalCode, validPhoneNumber} from "./RegEx.js";

export function validateEmail(email) {
    if (!validEmail.test(email)) {
        console.log("Email invalid!");
        return false;
    }
    return true;
}

export function validatePassword(password, confirmPassword) {
    if (!validPassword.test(password)) {
        console.log("Password Invalid");
        return false;
    }
    return validatePasswordsMatch(password, confirmPassword);
}

export function validatePasswordsMatch(password, confirmPassword) {
    if (!(password === confirmPassword)) {
        console.log("Passwords don't match");
        return false;
    }
    return true;
}

export function validatePostalCode(postalCode) {
    if (!validPostalCode.test(postalCode)) {
        console.log("Postalcode invalid!");
        return false;
    }
    return true;
}

export function validatePhoneNumber(phoneNumber) {
    if (!validPhoneNumber.test(phoneNumber)) {
        console.log("Phonenumber invalid!");
        return false;
    }
    return true;
}