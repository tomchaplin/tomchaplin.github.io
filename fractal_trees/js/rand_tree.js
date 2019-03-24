var strokeSlider;
var angleSlider;
var strokeOpacSlider;
var transitionSlider;
var minLengthSlider;
var lenRatioSlider;
var strokeOpacRatio = 0.95;
var strokeRatio = 0.6;
var lenRatio = 0.67;
var angleRange = 0;
var minLength = 10;
var transitionLevel = 6;
var backCol = 255;
var canvasSize = 400;

function setup() {
	canvasSize = Math.min(windowWidth, windowHeight)*0.9;
	canvas = createCanvas(canvasSize, canvasSize);
	canvas.parent('canvas-holder');
	background(backCol);
	strokeOpacSlider = createSlider(0,1,strokeOpacRatio,0.01);
	strokeOpacSlider.parent('strokeOpacSlider');
	strokeSlider = createSlider(0,1,strokeRatio,0.01);
	strokeSlider.parent('strokeSlider');
	lenRatioSlider = createSlider(0,0.99,lenRatio,0.01);
	lenRatioSlider.parent('lenRatioSlider');
	angleSlider = createSlider(0,PI,PI/2,0.01);
	angleSlider.parent('angleSlider');
	transitionSlider = createSlider(0,10,6,1);
	transitionSlider.parent('transitionSlider');
	minLengthSlider = createSlider(1,20,minLength,1);
	minLengthSlider.parent('minLengthSlider');
	button = createButton('Draw tree');
	button.parent('create_button');
	//button.mousePressed(drawTree);
	button.touchStarted(drawTree);
	button.addClass('std_button');
}

function windowResized(){
	canvasSize = Math.min(windowWidth, windowHeight)* 0.9;
	resizeCanvas(canvasSize, canvasSize);
}

function draw() {
	strokeOpacRatio = strokeOpacSlider.value()
	document.getElementById("strokeOpacReadout").innerHTML = strokeOpacRatio;
	strokeRatio = strokeSlider.value();
	document.getElementById('strokeReadout').innerHTML = strokeRatio;
	angleRange = angleSlider.value();
	document.getElementById('angleReadout').innerHTML = angleRange;
	transitionLevel = transitionSlider.value();
	document.getElementById('transitionReadout').innerHTML = transitionLevel;
	minLength = minLengthSlider.value();
	document.getElementById('minLengthReadout').innerHTML = minLength;
	lenRatio = lenRatioSlider.value();
	document.getElementById('lenRatioReadout').innerHTML = lenRatio;
	backCol = "#" + document.getElementById("background_colour").value;
}

function drawTree(){
	background(backCol)
	translate(width/2,height);
	drawBranch(canvasSize/4,1);
}

function drawBranch(len, level) {
	strokeWeight(4*Math.pow(strokeRatio,level-1));
	stroke(getColour(level));
	line(0,0,0,-len);
	translate(0,-len);
	if(len < minLength) {
		return;
	}
	var numBranches;
	var drawAngle;
	numBranches = Math.floor(Math.random()*Math.log(level) + 2) + 1 ;
	var left_side = false;
	for (var i = 0; i < numBranches; i++) {
		draw_angle = Math.random()*angleRange/2;
		if(left_side) {
			draw_angle = -draw_angle;
		}
		push();
		rotate(draw_angle);
		drawBranch(len*lenRatio, level + 1);
		pop();
		left_side = !left_side;
	}
}

// Thanks to https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb 
function hexToRGB(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function getColour(level) {
	var opacity = Math.pow(strokeOpacRatio, level - 1);
	if (level < transitionLevel) {
		var c = hexToRGB(document.getElementById("lower_colour").value);
		return 'rgba(' + c.r + "," + c.g + "," + c.b + "," + opacity + ")";
	} else {
		var c = hexToRGB(document.getElementById("upper_colour").value);
		return 'rgba(' + c.r + "," + c.g + "," + c.b + "," + opacity + ")";
	}
}
