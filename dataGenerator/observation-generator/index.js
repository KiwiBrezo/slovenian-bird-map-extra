const request = require('request');

const userIDs = [1, 2, 3, 4];
const birdIDs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
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

const numberOfNewObservations = 10000;

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

console.log("Zacenjam z vstavlanjem...");

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
		url: "http://164.8.9.88:8080/slovenian-bird-map/api/observation/addObservation",
        //url: "http://localhost:8080/api/observation/addObservation",
		method: "POST",
		headers: {
			'Content-Type': 'multipart/form-data'
		},	
		formData: observation
	},function (error, response, body){
        if (body == "OK") {
            console.log("USPESNO VSTAVLJEN PODATEK");
        } else {
            console.log("NAPAKA");
        }
    });
}