const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const tj = require('@mapbox/togeojson');
const DOMParser = require('xmldom').DOMParser;

const fs = require('fs')
const path = require('path')
var multer = require('multer')

var upload = multer({
    dest: 'uploads/'
})

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post('/convert', upload.single('file'), function (req, res) {
    var kml_file = new DOMParser().parseFromString(fs.readFileSync(req.file.path, 'utf8'));
    var file_converted = tj.kml(kml_file, {
        styles: true
    })
    var output = [];
    file_converted.features.forEach((item) => {
        item.geometry.coordinates.forEach((coordinate) => {
            console.log(coordinate)
            if (coordinate.length > 2) {
                coordinate.splice(2);
            }
        });
        output.push(item.geometry.coordinates);
    })
    res.send(output)
});

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});