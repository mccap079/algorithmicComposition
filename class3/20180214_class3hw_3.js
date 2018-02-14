var freq = 40;

var max = 0.0005;
var min = 0.1;

var startTime = min;
var dur = min;

// var peakPos = Math.floor(Math.random() * 1000);

var peakPos = [Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 1000)
];

//https://stackoverflow.com/a/21595293/1757149
peakPos = peakPos.sort(function(a, b) {
    return a - b;
});

console.log("peakPos = " + peakPos);
var minDist = 200;

console.log("f 1 0 16384 10 1");

for (var i = 0; i < 1000; i++) {
    if (i % 100 == 0) {
        freq = 220;
    } else {
        freq = 40;
    }
    var amp = 10;
    var pan = 0.5;
    console.log("i 1 " + startTime + " " + dur + " " + freq + " " + amp + " " + pan);

    var tmp_peakDists = [];
    var indexOfMin = 0;

    //get current distance from all peaks
    for (var j = 0; j < peakPos.length; j++) {
        tmp_peakDists[j] = Math.abs(peakPos[j] - i);
    }

    //find distance of closest peak
    var minimum = Math.min.apply(null, tmp_peakDists);

    //get its index
    for (var j = 0; j < tmp_peakDists.length; j++) {
        if (tmp_peakDists[j] == minimum) {
            indexOfMin = j;
        }
    }

    //change duration based on distance from this peak
    if (Math.abs(peakPos[indexOfMin] - i) <= minDist) {
        dur = convertToRange(i, [peakPos[indexOfMin] - minDist, peakPos[indexOfMin]], [min, max]);
    } else {
        dur = min;
    }

    startTime += dur;
}

function mtof(f) {
    return (440. * Math.exp(.057762265 * (f - 69.)));
}

//https://stackoverflow.com/a/10756409/1757149
function convertToRange(value, srcRange, dstRange) {

    if (value > srcRange[1]) {
        value = srcRange[1] - (value - srcRange[1]);
    }
    if (value < srcRange[0]) {
        value = srcRange[0];
    }

    var srcMax = srcRange[1] - srcRange[0],
        dstMax = dstRange[1] - dstRange[0],
        adjValue = value - srcRange[0];

    return (adjValue * dstMax / srcMax) + dstRange[0];

}