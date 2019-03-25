let tree;
var windSliderX, windSliderY, strengthSlider;
var strokeOpacSlider, strokeSlider, lenRatioSlider, angleSlider, transitionSlider, minLengthSlider,lenSDSlider;
var windSpeedX = 0;
var windSpeedY = 0;
var treeStrength = 0.01;
var lowerCol;
var upperCol;
var minLength= 10;
var lenRatio = 0.67;
var lenSD = 0.15;
var angleRange;
var strokeOpacRatio = 0.9;
var strokeRatio = 0.7;
var canvasSize;

function setup() {
	canvasSize = Math.min(windowWidth, windowHeight)*0.9;
	canvasSize = Math.min(canvasSize, 500);
	// Wind sliders
	windSliderX = createSlider(-5,5,0,0.1);
	windSliderX.parent('windSliderX');
	windSliderY = createSlider(-5,5,0,0.1);
	windSliderY.parent('windSliderY');
	strengthSlider = createSlider(0,0.1,treeStrength,0.001);
	strengthSlider.parent('strengthSlider');
	// Slider
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
	lenSDSlider = createSlider(0,1,lenSD,0.01);
	lenSDSlider.parent('lenSDSlider');
	button = createButton('Reload Tree');
	button.parent('create_button');
	//button.mousePressed(drawTree);
	button.touchStarted(reloadTree);
	button.addClass('std_button');
	// Colours
	lowerCol = hexToColour("#000000");
	upperCol = hexToColour("#FFFFFF");
	// Create canvas and tree
	canvas = createCanvas(canvasSize,canvasSize);
	canvas.parent('canvas-holder');
	tree = new Fractal_Tree(HALF_PI,0,1,canvasSize/4,lenSD,treeStrength);
	reloadTree();
}

function reloadTree(){
	strokeOpacRatio = strokeOpacSlider.value()
	strokeRatio = strokeSlider.value();
	angleRange = angleSlider.value();
	transitionLevel = transitionSlider.value();
	minLength = minLengthSlider.value();
	lenRatio = lenRatioSlider.value();
	lenSD = lenSDSlider.value();
	document.getElementById("strokeOpacReadout").innerHTML = strokeOpacRatio;
	document.getElementById('strokeReadout').innerHTML = strokeRatio;
	document.getElementById('angleReadout').innerHTML = angleRange;
	document.getElementById('transitionReadout').innerHTML = transitionLevel;
	document.getElementById('minLengthReadout').innerHTML = minLength;
	document.getElementById('lenRatioReadout').innerHTML = lenRatio;
	document.getElementById('lenSDReadout').innerHTML = lenSD;
	backCol = "#" + document.getElementById("background_colour").value;
	lowerCol = hexToColour(document.getElementById("lower_colour").value);
	upperCol = hexToColour(document.getElementById("upper_colour").value);
	tree.setLenSD(lenSD);
	tree.reloadTree(minLength,lenRatio,angleRange);
}

function draw() {
	windSpeedX = windSliderX.value();
	windSpeedY = windSliderY.value();
	treeStrength = strengthSlider.value();
	// Update slider readouts
	//strokeOpacRatio = strokeOpacSlider.value()
	//strokeRatio = strokeSlider.value();
	//angleRange = angleSlider.value();
	//transitionLevel = transitionSlider.value();
	//minLength = minLengthSlider.value();
	//lenRatio = lenRatioSlider.value();
	//lenSD = lenSDSlider.value();
	document.getElementById('windXReadout').innerHTML = windSpeedX;
	document.getElementById('windYReadout').innerHTML = windSpeedY;
	document.getElementById('strengthReadout').innerHTML = treeStrength
	// Draw tree
	background(backCol);
	translate(width/2,height);
	tree.setStrength(treeStrength);
	tree.giveWind(windSpeedX*0.01,windSpeedY*0.01);
	tree.update();
	tree.render(strokeOpacRatio, 4, strokeRatio, lowerCol, upperCol, transitionLevel);
}

function hexToColour(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	colour =  result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
	return colour
}
