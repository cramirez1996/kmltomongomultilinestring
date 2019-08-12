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
    var file_converted = tj.kml(kml_file)
    var output = [];
    file_converted.features.forEach((item) => {
        output.push(item.geometry.coordinates);
    })
    console.log('Archivo Procesado', output);
    // fs.readFile(req.file.path, (err, data) => {
    //     var stringSql = data.toString()

    //     var models = fs.readdirSync(path.resolve('ormModels'))
    //     models.forEach(function (file) {
    //         fs.unlinkSync(path.resolve('ormModels', file))
    //     })

    //     var controllers = fs.readdirSync(path.resolve('ormControllers'))
    //     controllers.forEach(function (file) {
    //         fs.unlinkSync(path.resolve('ormControllers', file))
    //     })

    //     Middleware.use(require('./middleware/1_entitiesToString')(stringSql));
    //     Middleware.use(require('./middleware/2_entityStringToObject'));
    //     Middleware.use(require('./middleware/3_ormModels'));
    //     Middleware.use(require('./middleware/4_ormControllers'));

    //     Middleware.go({}, (context) => {
    //         res.send(context)


    //     })



    // });

});

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});