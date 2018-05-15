
const fs = require('fs');
const path = require('path');

exports.upload = async (ctx) => {
    // console.log(ctx.request.body);


    const file = ctx.request.body.files.picture;

    const filename = Math.random().toString();
    const reader = fs.createReadStream(file.path);
    const stream = fs.createWriteStream(path.join(__dirname, "../../uploads", filename + ".jpg"));
    reader.pipe(stream);
    console.log('uploading %s -> %s', file.name, stream.path);

    ctx.body = filename + ".jpg";

}

exports.test = async (ctx) => {
    console.log("HI!!");
}