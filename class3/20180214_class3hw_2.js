var freq = 440;

var max = 0.0005;
var min = 0.1;

var startTime = min;
var dur = min;

// var peakPos = Math.floor(Math.random() * 1000);

var peakPos = [Math.floor(Math.random() * 1000)];

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
        freq = 440;
    }
    var amp = 10;
    var pan = 0.5;
    console.log("i 1 " + startTime + " " + dur + " " + freq + " " + amp + " " + pan);

    dur = convertToRange(i, [peakPos - minDist, peakPos], [min, max]);


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