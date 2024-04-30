var path = require("path");
const sharp = require('sharp');
const jwt = require("jsonwebtoken");
var fs = require('fs');
const methods = {
    async onUploadFile(req, real_path, attribute_name) {

        try {

            //
            let pathFile = null;

            if (!req.files || Object.keys(req.files).length === 0) {

            } else {

                if(req.files[attribute_name] == undefined) {
                    return null;
                }

                let uploadFile = req.files[attribute_name];
                let typeFile = uploadFile.mimetype.split("/");
                let d = new Date();
                let date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
                let nameFile = date + "-t-" + Date.now() + "." + typeFile[1];

                const dir = "public/uploads" + real_path;

                /* Create path if not exists */
                try{
                    if (!fs.existsSync(dir)){
                        console.log("Create path: " + dir);

                        /* Create path */
                        fs.mkdir(dir, { recursive: true }, (err) => {
                            if(err) console.log(err);
                        })
                    }
                } catch (error) {
                    console.log(error);
                }

                const uploadFolder = "/../" + dir;
                let pathUpload = path.resolve(
                    __dirname + uploadFolder + nameFile
                );

                /* Resize and save to path */
                sharp(uploadFile.data.buffer)
                .resize(300)
                .toFile(pathUpload, (err, info) => {
                    // console.log(info);
                    if (err) return err;
                });

                /* Move to path */
                // uploadFile.mv(pathUpload, function (err) {
                //   if (err) return err;
                // });

                pathFile = real_path + nameFile;

            }

            return pathFile;
        } catch (error) {
            return "error";
        }
    },
};

module.exports = { ...methods };
