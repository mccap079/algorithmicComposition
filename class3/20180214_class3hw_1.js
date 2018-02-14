var freq = 440;

var max = 0.0005;
var min = 0.1;

var startTime = min;
var dur = min;

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

    dur = convertToRange(i, [0, 500], [min, max]);
    startTime += dur;
}

function mtof(f) {
    return (440. * Math.exp(.057762265 * (f - 69.)));
}

//https://stackoverflow.com/a/10756409/1757149
function convertToRange(value, srcRange, dstRange) {

    if (value > srcRange[1]) {
        // return NaN;
        value = srcRange[1] - (value - srcRange[1]);
    }
    if (value < srcRange[0]) {
        return NaN;
    }

    var srcMax = srcRange[1] - srcRange[0],
        dstMax = dstRange[1] - dstRange[0],
        adjValue = value - srcRange[0];

    return (adjValue * dstMax / srcMax) + dstRange[0];

}