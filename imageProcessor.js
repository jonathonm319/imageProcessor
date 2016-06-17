var lwip = require("lwip");
var fs = require("fs");
var directory = "C:\\Users\\jonathonm\\Desktop\\Samsung\\images\\import";
var finishedImages = "C:\\Users\\jonathonm\\Desktop\\Samsung\\images\\ready\\";

var regularImageSize = [300, 300];
var thumbImageSize = [160, 160];

fs.readdir(directory, function(err, files){
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var fileParts = file.split(".");
        editImage(directory+"\\"+file, file, finishedImages, regularImageSize[0], regularImageSize[1]);
        editImage(directory+"\\"+file, fileParts[0]+"_thumb."+fileParts[1], finishedImages, thumbImageSize[0], thumbImageSize[1]);
    }
});

function editImage(imagePath, savedName, savedDirectory, desiredWidth, desiredHeight){
    lwip.open(imagePath, function(err, image){
        var currentWidth = image.width();
        var currentHeight = image.height();
        var scaleRatio;
        if(currentWidth > currentHeight){
            scaleRatio = desiredWidth / currentWidth;
        }else{
            scaleRatio = desiredHeight / currentHeight;
        }
        image.batch()
        .scale(scaleRatio, scaleRatio)
        .contain(desiredWidth, desiredHeight, {r: 0, g: 0, b: 0, a: 0})
        .writeFile(savedDirectory+savedName, function(err){
            //catch write error
        });
    });
}