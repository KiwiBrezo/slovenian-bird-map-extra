const request = require('request');

const userIDs = [12, 17, 18, 19];
const birdIDs = [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43];
const bboxMinLon = 13.6981099789;
const bboxMinLat = 45.4523163926;
const bboxMaxLon = 16.5648083839;
const bboxMaxLat = 46.8523859727;
const colMin = 1;
const colMax = 6;
const comment = "Samo test";
const minDay = 1;
const maxDay = 28;
const minMonth = 1;
const maxMonth = 12;
const minYear = 2019;
const maxYear = 2021;

const numberOfNewObservations = 4000;

function getRandomNumberInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomNumberFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function makeRandomDate() {
    var date = new Date(getRandomNumberInt(minYear, maxYear), getRandomNumberInt(minMonth, maxMonth), getRandomNumberInt(minDay, maxDay));
    return date.toISOString().split('T')[0];
}

for (var i = 0; i < numberOfNewObservations; i++) {
    var observation = {
        userID: userIDs[getRandomNumberInt(0, userIDs.length)],
        birdID: birdIDs[getRandomNumberInt(0, birdIDs.length)],
        comment: comment,
        lon: getRandomNumberFloat(bboxMinLon, bboxMaxLon),
        lat: getRandomNumberFloat(bboxMinLat, bboxMaxLat),
        date: makeRandomDate(),
        col: getRandomNumberInt(colMin, colMax)
    }

    request({
		url: "http://83.212.82.14:8080/api/addObservation",
		method: "POST",
		headers: {
			'Content-Type': 'multipart/form-data'
		},	
		formData: observation
	},function (error, response, body){
        if (body == "OK") {
            console.log("USPESNO VSTAVLJEN PODATEK");
        }
    });
}