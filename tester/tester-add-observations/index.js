const request = require('request');

const bboxMinLon = 13.6981099789;
const bboxMinLat = 45.4523163926;
const bboxMaxLon = 16.5648083839;
const bboxMaxLat = 46.8523859727;

var numberOfAddedObservations;
var doneObservationCounter = 0;
var counterOkReq = 0;
var counterErrReq = 0;

function getRandomNumberFloat(min, max) {
    return Math.random() * (max - min) + min;
}

async function doRequest(reqNum) {
    var observation = {
        userID: 1,
        birdID: 1,
        comment: "Stress test",
        lon: getRandomNumberFloat(bboxMinLon, bboxMaxLon),
        lat: getRandomNumberFloat(bboxMinLat, bboxMaxLat),
        date: new Date().toISOString().split('T')[0],
        col: 1
    }

    console.time("Request " + reqNum);

    request({
        url: "http://164.8.9.88:8080/slovenian-bird-map/api/observation/addObservation",
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data'
        },	
        formData: observation
    }, function (error, response, body) {
        console.timeEnd("Request " + reqNum);

        if (body == "OK") {
            console.log("USPESNO");
            counterOkReq++;
        } else {
            console.log("NAPAKA");
            counterErrReq++;
        }
        doneObservationCounter++;

        if (numberOfAddedObservations == doneObservationCounter) {
            console.timeEnd("Total time");
            console.log("Uspensi klici: " + counterOkReq);
            console.log("Neuspensi klici: " + counterErrReq);
        }
    });
}

numberOfAddedObservations = process.argv.slice(2)[0];
if (numberOfAddedObservations == null) return;
console.log("Stevilo vstavljenih podatkov: " + numberOfAddedObservations); 

console.time("Total time");
for (var i = 0; i < numberOfAddedObservations; i++) {
    doRequest(i);
}