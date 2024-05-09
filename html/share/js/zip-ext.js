/**
 * Compress files with minizip 
 * this requires https://www.npmjs.com/package/minizip-asm.js 
 * files from html, password should be str and out_file_name should be str
 * return encrypted file
 */
async function compress_with_minizip_and_encrypt(files, password) {
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
    return mzip.zip()

    // // Create a new file from the zip content
    // return new File([mzip.zip()], out_file_name, {
    //     type: 'application/octet-binary'
    // });
}