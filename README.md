# Node.js Asynchronous File Downloader

## Description

This packages downloads a file from a URL

## Usage

```bash
   npm install @anietz/file_downloader
```

### Using Async and await

```javascript
const downloader = require('@anietz/file_downloader');

(() =>{

const url = "https://media4.giphy.com/media/xT9DPrC1YWXBO1coyQ/giphy.gif?cid=790b7611be3f193ec4693cae0b1cf2cf5bef0c218f8bcf27&rid=giphy.gif&ct=g";
try{
   const response =  await downloader.download(url);
   console.log(response);
}catch(error){
   console.log(error);
}

}
```

### Using promise callbacks

```javascript
const downloader = require("@anietz/file_downloader");

const url =
  "https://media4.giphy.com/media/xT9DPrC1YWXBO1coyQ/giphy.gif?cid=790b7611be3f193ec4693cae0b1cf2cf5bef0c218f8bcf27&rid=giphy.gif&ct=g";

downloader
  .download(url)
  .then((res) => {
    console.log("download response", res);
  })
  .catch((err) => {
    console.log("download response", err);
  });
```
