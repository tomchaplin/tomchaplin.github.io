var strokeSlider;
var angleSlider;
var strokeOpacSlider;
var strokeOpacRatio = 0.95;
var strokeRatio = 0.6;
var lenRatio = 0.67;
var angleRange = 0;
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
	angleSlider = createSlider(0,PI,PI/2,0.01);
	angleSlider.parent('angleSlider');
	button = createButton('Draw tree');
	button.parent('create_button');
	button.mousePressed(drawTree);
	stroke('green');
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
	if(len < 4) {
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

function getColour(level) {
	var opacity = Math.pow(strokeOpacRatio, level - 1);
	if (level < transitionLevel) {
		return 'rgba(76, 66, 55, ' + opacity + ')';
	} else {
		return 'rgba(143, 226, 47, ' + opacity + ')';
	}
}
