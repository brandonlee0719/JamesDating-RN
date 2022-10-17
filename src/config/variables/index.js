import { Platform } from "react-native"


//DEV URL
var baseUrl = "https://jsonplaceholder.typicode.com/";

//UAT URL
//var baseUrl = "";

//LIVE URL
//var baseUrl = ";

/* All End Points should list here with Base URL */

const ENDPOINTS = {
    LOGIN: `${baseUrl}`,
    SIGNUP: `${baseUrl}`,
    POST: `${baseUrl}posts`,
}


const appUrlAndroid = "";
const appUrlIOS = "";
const appUrlAndroidForReview = "";
const appUrlIOSForReview = "";
const appUrl = Platform.OS == "android" ? appUrlAndroid : appUrlIOS;
const appUrlForReview = Platform.OS == "android" ? appUrlAndroidForReview : appUrlIOSForReview;
const termsUrl = "";
const privacyUrl = "";
const contactSupportMail = "";
const instructionsUrl = "";


const constantVariables = {
    TempUser: { name: "David Smith", email: "david@yopmail.com", pass: "asd123$A", userId: 12 }
}

const configVariables = {
    baseUrl,
    appUrl,
    appUrlForReview,
    termsUrl,
    privacyUrl,
    contactSupportMail,
    instructionsUrl,
    ENDPOINTS,

}

export default {
    ...configVariables,
    ...constantVariables
}