import React from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

/***
 * This file has two functions ( openCamera and openLibrary ) for selecting images,
 * You can call these functions like below to get the result.
 *     
 * let res = fromCamera ? await openCamera() : await openLibrary();
 *   if (res.name || res.uri) {
       // do work
    }
 *  
 * The above functions will return image object or false.
 * 
 */

let options = {
    mediaType: 'photo',
    cameraType: 'back',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    }
}
const openCamera = () => {
    return new Promise((resolve, reject) => {
        launchCamera(options, (res) => {
            if (res.errorCode) {
                console.log(`%c${`Error Image Picker`}`, 'color: red', ' => ', res.errorCode);
                resolve(false)
                return;

            }
            if (res.didCancel) {
                console.log(`%c${`Error Image Picker`}`, 'color: red', ' => ', 'User Cancelled Image');
                resolve(false);
                return;
            }
            else if (res.error) {
                console.log(`%c${`Error Image Picker`}`, 'color: red', ' => ', res.error);
                resolve(false)
                return;
            } else {
                ImageResizer.createResizedImage(res?.assets[0]?.uri, 720, 480, 'JPEG', 30)
                    .then((compression) => {
                        resolve({
                            name: compression.name,
                            type: res?.assets[0]?.type,
                            uri:  compression.uri,
                        });
                    })
            }
        });
    })
}


const openLibrary = () => {
    return new Promise((resolve, reject) => {
        launchImageLibrary(options, (res) => {
            if (res.errorCode) {
                console.log(`%c${`Error Image Picker`}`, 'color: red', ' => ', res.errorCode);
                resolve(false);
                return;
            }
            if (res.didCancel) {
                console.log(`%c${`Error Image Picker`}`, 'color: red', ' => ', 'User Cancelled Image');
                resolve(false);
                return;
            }
            else if (res.error) {
                console.log(`%c${`Error Image Picker`}`, 'color: red', ' => ', res.error);
                resolve(false)
                return;
            } else {
                ImageResizer.createResizedImage(res?.assets[0]?.uri, 720, 480, 'JPEG', 30)
                .then((compression) => {
                    resolve({
                        name: compression.name,
                        type: res?.assets[0]?.type,
                        uri:  compression.uri,
                    });
                })
            }
        });
    })
}

export { openCamera, openLibrary };