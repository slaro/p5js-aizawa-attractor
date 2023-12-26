var easycam;

// x, y, z coords
var x = 0.01;
var y = 0.0;
var z = 0.0;

// Parameters
var a = 0.5;
var b = 0.95;
var c = 0.6;
var d = 3.5;
var e = 0.7;
var f = 0.1;
var ribbon_length = 250.0;

// tracking values
var count = 0;

// Array keeps track of all the vertexs
var points = new Array();

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    colorMode('hsb');
    easycam = createEasyCam();

    // suppress right-click context menu
    document.oncontextmenu = function () { return false; }

}

function draw() {
    background(0);

    var dt = 0.1;
    count += 1;
    dx = ((z - e) * x - d * y) * dt;
    dy = (d * x + (z - e) * y) * dt;
    dz = (c + a * z - z * z * z / 3 - (x * x + y * y) * (1 + e * z) + f * z * x * x * x) * dt;

    x = (x + dx);
    y = (y + dy);
    z = (z + dz);

    // console.log("dx", dx, " x ", x, "\n");
    // console.log("dy: ", dy, " y: ", y, "\n");
    // console.log("dz: ", dz, " z: ", z, "\n");
    // console.log(points.length)
    myVector = createVector(x, y, z);
    points.push(myVector);

    if (points.length > ribbon_length) {
        //points.subList(0, 3).clear();
        // points.pop(points.length -1);
        points.shift(0);
    }

    translate(0, 0, 0);
    scale(5);
    stroke(255);
    noFill();

    var hue = 0;    // Yay, rainbows!
    var exp = 20.0;  // This let's us grow object size
    var sw = 0.0; // stroke weight
    var sw_max = 9; // stroke weight max

    beginShape();
    points.forEach(
        function (v) {
            stroke(hue, 255, 255);
            if (sw > sw_max) {
                sw = 0;
            }
            sw += sw_max / ribbon_length;
            strokeWeight(sw);

            // console.log("psize ", points.length, "\n");

            // apply the exp(and) value to each point
            point(exp * v.x, exp * v.y, (exp + 2) * v.z);

            hue = hue + (255 / ribbon_length);
            if (hue > 255) {
                hue = 0;
            }
        }
    )
    endShape();

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// function keyPressed() {
//     var k = keyCode;
//     looping ^= k == 'P';
//     redraw = k == 'S';
// }
