---
layout: portfolio
featured_img: /assets/portfolio/2019-03-24-Random-Fractal-Trees/fractal_tree6_variation02_crop.png
external_link: https://tomchaplin.github.io/fractal_trees
display_latex: true
---
Continuing on the theme of fractals, I was inspired by a Coding Train video to try my hand at drawing fractal trees using the fantastic [p5.js library](https://p5js.org/) for Javascript.
To get a more natural result I introduced some randomness in a variety of places in the algorithm, and changed the paintbrush as I drew further along the tree.
<!--more-->

### What is a Fractal Tree?

The best way to get a feel for what a fractal tree is, is to have a go at drawing your own.
To this end, I encourage you to go and play with the [fractal tree generator](https://tomchaplin.github.io/fractal_trees) that I have created as part of this project.
To understand the basic definition better make sure you turn down the branch length variation to 0.

<figure class = "in_article">
    <hr class="midrule">
    <div>
        <div><img src="/assets/portfolio/2019-03-24-Random-Fractal-Trees/fractal_tree_no_random.png" alt="A basic fractal tree with no randomness"></div>
    </div>
    <figcaption>A basic fractal tree with no randomness</figcaption>
    <hr class="midrule">
</figure>

Formally, a fractal tree can be seen as the invariant set of an [iterated function system](http://mathworld.wolfram.com/IteratedFunctionSystem.html).
Intuitively, we can draw a fractal tree by first drawing a branch of some length directly upwards.
We then draw two scaled down copies of the fractal tree at angles \\(\alpha\\) and \\(-\alpha\\) (say \\(\alpha=\pi/6\\)).
It may seem as though this definition is tautological but in fact it does give us a mathematically well-defined set.

Indeed, for any scale factor this is always well-defined but is only a bounded set when the scale factor is less than 1.
If the scale factor is bigger than a half then we would need an infinite amount of ink to draw this image.
Moreover, due to the nature of recursion in computing, it would take an infinite amount of time and resources to draw this computationally regardless of the scale factor. 
To create a good approximation of the fractal tree, we stop drawing once new branches becomes too small to notice (say 4 pixels long).

For a more visual demonstration of this definition and a guide to coding this drawing algorithm in p5.js please watch [this fantastic video by The Coding Train](https://www.youtube.com/watch?v=0jjeOYMjmDU).

### Introducing Randomness

These images are very compelling and reveal some very interesting patterns.
However, from an artistic perspective they lack the natural imperfections that one would expect from a real tree.
To remedy this and provide scope for artistic experimentation, I felt it necessary to introduce some random elements to this definition.

#### Number of branches

At each level of the tree we draw a random number of branches.
Moreover, the average number of branches increases logarithmically with each level of the tree.
In this algorithm, the number of branches is chosen uniformly at random from the integers between \\(2\\) and \\(\text{floor}(\log(level))+3\\).

#### Branching angle

Now that we have a randomly chosen number of branches we could space them equally over a given angle range.
To introduce more randomness, and create more natural looking images, the angle of rotation for each branch is chosen again at random within a given range.
However, this can sometimes lead to lopsided trees where both initial branches are chosen on the left side of the main trunk.
To alleviate this, random numbers are chosen at random from half the range and then branches are drawn alternately on the left and right side.

#### Branch length

Finally, the length of each branch is chosen at random from a Gaussian distribution.
If branches at the current level would usually be \\(l\\) then the mean of this distribution is \\(l\\) and the standard deviation is \\(\sigma\cdot l\\) where \\(\sigma\\) is some controllable parameter.
An alternative technique would be set the mean equal to the length of the previous branch.

### Drawing Techniques

In nature, leaves are usually significantly thinner than the main trunk and so to create a more natural picture we decrease the stroke weight and opacity at each level by some fixed ratio.
This creates a less busy, more natural looking image.

Moreover, leaves are generally a different colour to the trunk and main branches.
To this end, we can colour the first \\(n \\) levels in one colour and the remaining levels in another colour.
This vastly increases the artistic possibilities.

### Finished Result and Next Steps

If you'd like to play with this algorithm and make some artistic fractal trees please check out [my generator](https://tomchaplin.github.io/fractal_trees), which is implemented in the p5.js library.
Note this runs in Javascript entirely in the browser and so is not the most performant generator.
Below are some examples I have made with the generator.

<figure class = "in_article">
	<hr class="midrule">
	<div class="side_by_side">
		<div><img src="/assets/portfolio/2019-03-24-Random-Fractal-Trees/featured_tree3.png" alt="Example of a random fractal tree"></div>
		<div><img src="/assets/portfolio/2019-03-24-Random-Fractal-Trees/featured_tree.png" alt="Example of a random fractal tree"></div>
	</div>
	<figcaption>Some examples of random fractal trees</figcaption>
	<hr class="midrule">
</figure>

<figure class = "in_article">
	<hr class="midrule">
	<div class="side_by_side">
		<div><img src="/assets/portfolio/2019-03-24-Random-Fractal-Trees/fractal_tree6_variation01.png" alt="Example of a random fractal tree"></div>
		<div><img src="/assets/portfolio/2019-03-24-Random-Fractal-Trees/fractal_tree7.png" alt="Example of a random fractal tree"></div>
	</div>
	<figcaption>Some examples of random fractal trees</figcaption>
	<hr class="midrule">
</figure>

There is certainly much more to do with this generator.
For example, we could:

* Choose the branching angles from an appropriate normal distribution.
* Colour the branches based on a colour gradient between the upper and lower angles.
* Add a parameter to control how the maximum number of branches increases at each level (to control "bushiness" at the top of the tree).
* Animate the trees by allowing each branch to sway more easily and perhaps more chaotically in the wind based on their thickness.
* Implement this algorithm in Java or C++ for better performance.
