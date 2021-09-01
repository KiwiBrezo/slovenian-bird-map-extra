const request = require('request');

var numberOfSearch;
var term;
var doneSearchCounter = 0;
var counterOkReq = 0;
var counterErrReq = 0;

async function doRequest(reqNum) {
    var data = {
        term: term,
        limit: 15,
        offset: 0
    }

    console.time("Request " + reqNum);

    request({
        url: "http://164.8.9.88:8080/slovenian-bird-map/api/observation/searchObservation",
        method: "GET",
        headers: {
            'Content-Type': 'multipart/form-data'
        },	
        formData: data
    }, function (error, response, body) {
        console.timeEnd("Request " + reqNum);

        //console.log(body);
        //console.log(error);
        if (body == "[]" || error != null) {
            console.log("NAPAKA");
            counterErrReq++;
        } else {
            console.log("USPESNO");
            counterOkReq++;
        }
        doneSearchCounter++;

        if (numberOfSearch == doneSearchCounter) {
            console.timeEnd("Total time");
            console.log("Uspensi klici: " + counterOkReq);
            console.log("Neuspensi klici: " + counterErrReq);
        }
    });
}

numberOfSearch = process.argv.slice(2)[0];
term = process.argv.slice(2)[1];
if (numberOfSearch == null || term == null) return;
console.log("Stevilo iskanj: " + numberOfSearch); 
console.log("Iskalni niz: " + term); 

console.time("Total time");
for (var i = 0; i < numberOfSearch; i++) {
    doRequest(i);
}