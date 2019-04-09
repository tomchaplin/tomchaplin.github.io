// @format

class Fractal_Tree {
	constructor(
		cum_angle,
		base_angle,
		level,
		mean_len,
		lenSD,
		strength,
		parent
	) {
		this.cum_angle = cum_angle;
		this.base_angle = base_angle;
		this.current_angle = base_angle;
		this.level = level;
		this.mean_len = mean_len;
		this.len = randomGaussian() * lenSD * mean_len + mean_len;
		this.lenSD = lenSD;
		this.strength = strength;
		this.vel = 0;
		this.acc = 0;
		this.xWindVel = 0;
		this.yWindVel = 0;
		this.children = [];
		this.parent = parent;
	}

	update() {
		// Need better angle calaculation!
		var currentCumAngle = this.makeAngle(this.getCurrentCumAngle());
		// Compute the new acceleration
		var windMag2 =
			this.xWindVel * this.xWindVel + this.yWindVel * this.yWindVel;
		var windAngle =
			PI -
			this.computeAngle(
				Math.atan2(this.yWindVel, this.xWindVel),
				currentCumAngle
			);
		this.acc =
			this.strength *
				this.computeAngle(this.current_angle, this.base_angle) +
			windMag2 * this.computeAngle(this.current_angle, windAngle);
		// Some wind resistance
		this.acc += -Math.sign(this.vel) * (this.vel * this.vel);
		// Update the velocity (based on mass of branch)
		this.vel += this.acc * this.level;
		// Update the angle
		this.current_angle += this.vel;
		this.current_angle = this.makeAngle(this.current_angle);
		var child;
		for (child of this.children) {
			child.update();
		}
	}

	getCurrentCumAngle() {
		if (this.level == 1) {
			return this.cum_angle;
		} else {
			return this.parent.getCurrentCumAngle() + this.current_angle;
		}
	}

	computeAngle(from, to) {
		//return (to - from);
		from = this.makeAngle(from);
		to = this.makeAngle(to);
		var difference = to - from;
		var alternate = TWO_PI - difference;
		if (Math.abs(difference) < Math.abs(alternate)) {
			return difference;
		} else {
			return -alternate;
		}
	}

	makeAngle(num) {
		while (num > PI) {
			num -= TWO_PI;
		}
		while (num < -PI) {
			num += TWO_PI;
		}
		return num;
	}

	giveWind(xvel, yvel) {
		this.xWindVel = xvel;
		this.yWindVel = yvel;
		var child;
		for (child of this.children) {
			child.giveWind(xvel, yvel);
		}
	}

	addAngle(num) {
		this.current_angle += num;
		var child;
		for (child of this.children) {
			child.addAngle(num);
		}
	}

	constructTree(minLength, lenRatio, angleRange) {
		// Compute the new items we'll need for construction
		var cum_angle = this.cum_angle + this.base_angle;
		var mean_len = this.mean_len * lenRatio;
		// Check we're not supposed to stop
		if (mean_len < minLength) {
			return;
		}
		// Choose a random number of branches
		var numBranches =
			Math.floor(Math.random() * Math.log(this.level) + 2) + 2;
		var left_side = false;
		var drawAngle;
		for (var i = 0; i < numBranches; i++) {
			// Get random draw angle
			drawAngle = (Math.random() * angleRange) / 2;
			// Alternate betweeen left and right
			if (left_side) {
				drawAngle = -drawAngle;
			}
			// Construct new tree
			this.children.push(
				new Fractal_Tree(
					cum_angle,
					drawAngle,
					this.level + 1,
					mean_len,
					this.lenSD,
					this.strength,
					this
				)
			);
			left_side = !left_side;
		}
		// Get new trees to construct their own trees
		var child;
		for (child of this.children) {
			child.constructTree(minLength, lenRatio, angleRange);
		}
	}

	deleteTree() {
		this.children = [];
	}

	render(
		strokeOpacRatio,
		startWeight,
		strokeWeightRatio,
		lowerColour,
		upperColour,
		tLevel
	) {
		var opacity = Math.pow(strokeOpacRatio, this.level - 1);
		if (this.level < tLevel) {
			stroke(this.getColour(lowerColour, opacity));
		} else {
			stroke(this.getColour(upperColour, opacity));
		}
		strokeWeight(Math.pow(strokeWeightRatio, this.level - 1) * startWeight);
		line(0, 0, 0, -this.len);
		translate(0, -this.len);
		var child;
		for (child of this.children) {
			push();
			rotate(child.current_angle);
			child.render(
				strokeOpacRatio,
				startWeight,
				strokeWeightRatio,
				lowerColour,
				upperColour,
				tLevel
			);
			pop();
		}
	}

	getColour(colour, opacity) {
		return (
			"rgba(" +
			colour.r +
			"," +
			colour.g +
			"," +
			colour.b +
			"," +
			opacity +
			")"
		);
	}

	reloadTree(minLength, lenRatio, angleRange) {
		this.len =
			randomGaussian() * this.lenSD * this.mean_len + this.mean_len;
		this.deleteTree();
		this.constructTree(minLength, lenRatio, angleRange);
	}

	setStrength(newStrength) {
		this.strength = newStrength;
		var child;
		for (child of this.children) {
			child.setStrength(newStrength);
		}
	}

	setLenSD(newSD) {
		this.lenSD = newSD;
		var child;
		for (child of this.children) {
			child.setLenSD(newSD);
		}
	}
}
