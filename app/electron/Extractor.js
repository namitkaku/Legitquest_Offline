var yauzl = require("yauzl");
var fs = require("fs");
var path = require('path');


const extract = require('extract-zip')

async function exporter(file) {
    let basPath = (__dirname).substring(0,__dirname.lastIndexOf("/electron"))  
    const path = `${basPath}/my-downloads/es/indexes` 
      try {

        await extract(file, { dir:path })
        console.log('Extraction complete')
      } catch (err) {
          console.log("Error",err);
        
      }  


  /* yauzl.open(
    file,
    { lazyEntries: true },
    function (err, zipfile) {
      if (err) throw err;
      zipfile.readEntry();
      zipfile.on("entry", function (entry) {
        if (/\/$/.test(entry.fileName)) {
         
          zipfile.readEntry();
        } else { 
          zipfile.openReadStream(entry, function (err, readStream) {
            if (err) throw err;
            readStream.on("end", function () {
              zipfile.readEntry();
            }); 
            let str=""
            readStream.on('data', data => {
                str += data.toString();
              });

             
            readStream.on('end', function() {
                console.log(entry.fileName);
                console.log(str); 
                zipfile.readEntry();
              }); 
          });
        }
      });
    }
  ); */

  
}


module.exports =  exporter;