async function _sha256(message) {
    // Encode the message as a WordArray
    const encodedMessage = CryptoJS.enc.Utf8.parse(message);

    // Perform SHA-256 hashing
    const hash = CryptoJS.SHA256(encodedMessage);

    // Convert the hash result to a hex string
    return hash.toString(CryptoJS.enc.Hex);
}

function _generateKeyFromSeed(seed, saltStr = 'some_salt') {
    // Convert salt to word array
    const salt = CryptoJS.enc.Utf8.parse(saltStr);

    // Derive key using PBKDF2
    const key = CryptoJS.PBKDF2(seed, salt, {
        keySize: 256 / 32, // Key size is specified in terms of words (1 word = 4 bytes)
        iterations: 100000, // Adjust the number of iterations as needed
        hasher: CryptoJS.algo.SHA256 // Use SHA-256 as the hashing function
    });

    // Convert the derived key to a hexadecimal string to return it
    return key.toString(CryptoJS.enc.Hex);
}

// async function _encrypt(data, key) {
//     const iv = CryptoJS.lib.WordArray.random(12); // Generate random IV (12 bytes)
//     const cipher = CryptoJS.createCipheriv('aes-256-gcm', key, iv);

//     // Prepare data as WordArray
//     const dataWordArray = CryptoJS.enc.Utf8.parse(data);

//     // Encrypt
//     const encrypted = cipher.update(dataWordArray, CryptoJS.enc.Utf8).finalize(CryptoJS.enc.Base64);

//     return {
//         ciphertext: encrypted,
//         iv: iv.toString(CryptoJS.enc.Hex)
//     };
// }

// async function decrypt(encryptedData, key, iv) {
//     const ivWordArray = CryptoJS.enc.Hex.parse(iv);
//     const decipher = CryptoJS.createDecrypteriv('aes-256-gcm', key, ivWordArray);

//     // Decrypt (Base64 encoded ciphertext)
//     const decrypted = decipher.update(CryptoJS.enc.Base64.parse(encryptedData), CryptoJS.enc.Utf8).finalize(CryptoJS.enc.Utf8);

//     return decrypted.toString(CryptoJS.enc.Utf8);
// }

function uint8ArrayToBase64(uint8Array) {
    return btoa(String.fromCharCode.apply(null, uint8Array));
}

// Convert base64 string to Uint8Array
function base64ToUint8Array(base64) {
    var binaryString = atob(base64);
    var uint8Array = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
    }
    return uint8Array;
}
async function _encrypt2Str(message, secretKey) {
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    const iv = CryptoJS.lib.WordArray.random(16);

    const encrypted = CryptoJS.AES.encrypt(message, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });

    // The .toString() on encrypted object gets us the ciphertext in Base64
    // The iv is also turned into Base64 so it's easy to transport
    return `${iv.toString(CryptoJS.enc.Base64)}:${encrypted.toString()}`;
}

async function _decrypt2Str(ciphertextAndIv, secretKey) {
    console.log('got here', ciphertextAndIv)
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    const components = ciphertextAndIv.split(':');
    const iv_from_ciphertext = CryptoJS.enc.Base64.parse(components[0]);
    const ciphertextEncoded = components[1];

    const decrypted = CryptoJS.AES.decrypt(ciphertextEncoded, key, {
        iv: iv_from_ciphertext,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
}

// async function encrypt2bin(data, key) {
//     const {
//         encryptedData,
//         iv
//     } = await encrypt(new TextEncoder().encode(data), key)
//     const uint8Array = new Uint8Array(encryptedData);
//     const combinedArray = new Uint8Array(iv.length + uint8Array.length);
//     combinedArray.set(iv, 0);
//     combinedArray.set(uint8Array, iv.length);
//     return combinedArray
// }

// async function decryptStrFromBin(bytes, key) {
//     const ivLength = 12
//     const oiv = bytes.slice(0, ivLength);
//     const odt = bytes.slice(ivLength);
//     return decrypt(odt, key, oiv)
// }


/**
 * Compress files with minizip 
 * this requires https://www.npmjs.com/package/minizip-asm.js 
 * files from html, password should be str and out_file_name should be str
 * return encrypted file
 */
async function compress_with_minizip_and_encrypt(files, password, out_file_name) {
    const mzip = new Minizip();

    // Map each file to a promise and collect those promises in an array
    const promises = Array.from(files).map(file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(event) {
                mzip.append(file.name, event.target.result, {
                    password: password
                });
                resolve();
            };
            reader.onerror = function(error) {
                reject(error);
            };
            reader.readAsArrayBuffer(file); // Use readAsArrayBuffer for binary data
        });
    });

    // Wait for all promises to resolve
    await Promise.all(promises);

    // Create a new file from the zip content
    // return new File([mzip.zip()], out_file_name, {
    //     type: 'application/octet-binary'
    // });
    return mzip.zip()
}