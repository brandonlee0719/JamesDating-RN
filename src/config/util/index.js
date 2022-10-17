
/* Regex to check email */
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

/* The following regex is for password that contain atleast one lower case alphabet, 
one upper case alphabet, one number and password length should be 8 minimum */
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

/* [a-z] ensures that a name always starts with a letter, then [-']?[a-z]+ allows for a 
seperating character as long as it's followed by at least another letter. * allows 
for any number of these parts.

The second half, ( [a-z]([-']?[a-z]+)*) matches a space followed by another name of the same pattern.
+ makes sure at least one additional name is present, but allows for more. ({1,2} could be 
used if you want to allow only two or three part names. */
const fullNameRegex = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/;

/* The following regex check only for name */
const nameRegex = /^([a-zA-Z ]){2,30}$/;

/* Check for phone number - minimum 8 digits */
const phoneNumberRegex = /^(([\+]([\d]{2,}))([0-9\.\-]{8,})|([0-9\.\-\/\s]{8,}))*$/;

/* Check for only numbers */
const numberRegex = /^[0-9]*$/;


const isEmailValid = (email = "") => emailRegex.test(String(email).toLowerCase());
const isPasswordValid = (password = "") => passwordRegex.test(password);
const isFullNameValid = (fullName = "") => nameRegex.test(String(fullName).trim().toLocaleLowerCase());
const isPhoneNumberValid = (phoneNumber = "") => phoneNumberRegex.test(phoneNumber);
const isNumber = (number = 0) => numberRegex.test(number);

export default {
    isEmailValid,
    isPasswordValid,
    isFullNameValid,
    isPhoneNumberValid,
    isNumber
}