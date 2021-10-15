
const fs = require('fs');
const https = require('https');
const randomstring = require('randomstring');

exports.download =  function (url) {
     
    const dest = getUniqueFileName(url);
    //const file = fs.createWriteStream(DestinationfileName);

      return new Promise((resolve, reject) => {
    // Check file does not exist yet before hitting network
    fs.access(dest, fs.constants.F_OK, (err) => {

        if (err === null) reject('File already exists');

        const request = https.get(url, response => {
            if (response.statusCode === 200) {
       
              const file = fs.createWriteStream(dest, { flags: 'wx' });
              file.on('finish', () => resolve(
                    {
                    data: {
                      fileName:dest,
                      status: 'completed',
                      size: null,
                      error: null,
                    },
                    status: 'success',
                  })
              
              );
              file.on('error', err => {
                file.close();
                if (err.code === 'EEXIST') reject('File already exists');
                else fs.unlink(dest, () => reject(err.message)); // Delete temp file
              });
              response.pipe(file);
            } else if (response.statusCode === 302 || response.statusCode === 301) {
              //Recursively follow redirects, only a 200 will resolve.
              download(response.headers.location, dest).then(() => resolve());
            } else {
              reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
            }
          });
      
          request.on('error', err => {
            reject(err.message);
          });
    });
  });

   
}

/**
 * Generate unique file name
 * @param fileName 
 * @returns 
 */
function getUniqueFileName (url){

    const fileNameData = url.split("/");
    const fileNameFromURL = fileNameData[fileNameData.length - 1];

     const randomStringData = randomstring.generate({
        length: 10,
        charset: 'alphanumeric',
    });

    const fileName = fileNameFromURL.split(".");

     if(fileName.length > 1){
        const name = fileName[0];
        const extension = removeAllQueryParams(fileName[1]);
        return `${name}_${randomStringData}.${extension}`;
    }

    return fileNameFromURL;
}


/**
 * Remove all query params from the string
 * @param {*} str 
 * @returns 
 */
function removeAllQueryParams(str){
    const data = str.split("?");
    return data[0];
}
