---
layout: portfolio
featured_img: /assets/portfolio/2018-11-02-Exploring-the-Mandelbrot-Set/statics/zoom1/smooth_histogram_small.jpg
display_latex: true
github_link: https://github.com/tomchaplin/Multithreaded_Mandelbrot
featured: true
---
The Mandelbrot set has become an ambassador for the beauty of mathematics. Its hypnotic, complex structure has astounded mathematicians and non-mathematicians alike, and has been a subject of mathematical research for decades. Interested in the structure and behaviour of the Mandelbrot set, I used Python to animate zooms into this captivating fractal. The limitations of interpreted lagnuages like Python soon became clear so I turned to multi-threaded techniques and C++ to speed things up.
<!--more-->

### Formal Definition

To formally define the Mandelbrot set, for every \\(c\in\mathbb{C}\\) we define the function \\( f_c: \mathbb{C}\to\mathbb{C},\;z\mapsto z^2 + c \\) and subsequently the sequence \\( \left( z\_{c,n} \right)\_{n=0}^\infty \\) by \\(z\_{c,0}=0\\) and \\(z\_{c,n+1}=f(z\_{c,n})\\). Now we can define the Manelbrot set to be the set of points \\(c\in\mathbb{C}\\) such that \\( \left( z\_{c,n} \right)\_{n=0}^\infty \\) is bounded.

We would like to draw a picture of the Mandebrot set, but determining whether a sequence is bounded would require computing the entire infinite sequence which is quite a long job. In order to compute whether a given point of the complex plane lies within the Mandelbrot set, we require a simpler criterium. Thus, we introduce an escape radius \\(r>0\\) which we choose with the property that if \\(|z_{c,n}|>r\\) for some \\(n\in\mathbb{N}\\) then we may conclude \\(c\not\in M\\). It can be shown quite simply that [2 is an escape radius](https://math.stackexchange.com/questions/890190/mandelbrot-sets-and-radius-of-convergence).

We now have a very simple algorithm for determining whether or not a point lies in the Mandelbrot set. We compute the sequence \\( \left( z\_{c,n} \right) \\) and, if it any point we see that \\(|z_{c,n}|>2\\), then we can conclude that \\(c\not\in M\\). Unfortunately, we can't keep doing this forever so we must decide before hand on a maximum number of points in the sequence we are willing to compute, before we give up and guess that \\(c\\) belongs to the Mandelbrot set. Of course, the more iterations we compute, the more accurate our drawing of the mandelbrot set becomes.

But we can do better. For all for the points we know lie outside of the Mandelbrot set, we also know how long it took for the sequence to escape. If a point escapes very quickly then, in some sense, it is very far away from the set. Therefore, based on how many iterations it took for the sequence to escape, we can colour in each point in \\(\mathbb{C}\\), based on how close it is to being in the Mandelbrot set.

### Colouring

There are a number of methods for colouring in the Mandelbrot set. All of the methods start with a pallete of colours. One approach would be to map 0 iterations to the first colour, the maximum number of iterations to the last colour and then linearly interpolate all colours inbetween. This presents a problem as we zoom into the set, because points very close to each other will take roughly the same number of iterations to escape and thus will be coloured very similarly producing a rather boring, monotone image. One fix to this would be to pick a relatively small palette and keep looping around the palette. For example, if we take a pallete of 100 colours then we would colour a point the same if it took 0 iterations or 100 iterations.

This produces a colourful image but we have now lost the property that one side of our palette is 'closer' to the Mandelbrot set than the other. The solution to this is a method known as histogram colouring. We start by making a histogram where we count how many pixels took each number of iterations to escape. We then use this to map each iteration number to a colour in the palette. This ensures that the first and last colours are used so the pictures will use the full range of colours avaiable in the palette so we get pictures with much better contrast.

<figure class = "in_article">
    <hr class="midrule">
    <div class="side_by_side">
        <div><img src="/assets/portfolio/2018-11-02-Exploring-the-Mandelbrot-Set/statics/normal.gif" alt="Normal colouring algorithm"></div>
        <div><img src="/assets/portfolio/2018-11-02-Exploring-the-Mandelbrot-Set/statics/looped.gif" alt="Looped palette colouring algorithm"></div>
        <div><img src="/assets/portfolio/2018-11-02-Exploring-the-Mandelbrot-Set/statics/histogram.gif" alt="Histogram colouring algorithm"></div>
    </div>
    <figcaption>Comparing discrete colouring algorithms. From left to right: normal, looped palette, histogram.</figcaption>
    <hr class="midrule">
</figure>

<figure class = "in_article">
    <hr class="midrule">
    <div class="side_by_side">
        <div><img src="/assets/portfolio/2018-11-02-Exploring-the-Mandelbrot-Set/statics/zoom1/normal.gif" alt="Normal colouring algorithm"></div>
        <div><img src="/assets/portfolio/2018-11-02-Exploring-the-Mandelbrot-Set/statics/zoom1/looped.gif" alt="Looped palette colouring algorithm"></div>
        <div><img src="/assets/portfolio/2018-11-02-Exploring-the-Mandelbrot-Set/statics/zoom1/histogram.gif" alt="Histogram colouring algorithm"></div>
    </div>
    <figcaption>Comparing discrete colouring algorithms when zoomed in. From left to right: normal, looped palette, histogram.</figcaption>
    <hr class="midrule">
</figure>

This is clearly a much better way to colour our Mandelbrot set if we wish to retain detail as we zoom into the set as we can guarantee that we will use the full range of colours in our palette. However, from an artistic viewpoint, these images are still lacking somewhat. Since we are colouring based on a discrete property (the number of iterations to escape), we end up with discrete jumps between colours in our palette, creating clear bands of colour. We would prefer to see a continuous change from one colour to the next so we need a property similar to iteration number which can take on any real value, not discrete integers.

The property which solves this problem is known as the normalised iteration count. For an explanation of this colouring algorithm, please see this [excellent post by Linas Vepstas](http://linas.org/art-gallery/escape/escape.html).

<figure class = "in_article">
    <hr class="midrule">
    <div class="side_by_side">
        <div><img src="/assets/portfolio/2018-11-02-Exploring-the-Mandelbrot-Set/statics/smooth_looped.gif" alt="Smooth looped palette colouring algorithm"></div>
        <div><img src="/assets/portfolio/2018-11-02-Exploring-the-Mandelbrot-Set/statics/smooth_histogram.gif" alt="Smooth histogram colouring algorithm"></div>
    </div>
    <figcaption>Comparing smooth colouring algorithms. From left to right: looped palette, histogram.</figcaption>
    <hr class="midrule">
</figure>

<figure class = "in_article">
    <hr class="midrule">
    <div class="side_by_side">
        <div><img src="/assets/portfolio/2018-11-02-Exploring-the-Mandelbrot-Set/statics/zoom1/smooth_looped.gif" alt="Smooth looped palette colouring algorithm"></div>
        <div><img src="/assets/portfolio/2018-11-02-Exploring-the-Mandelbrot-Set/statics/zoom1/smooth_histogram.gif" alt="Smooth histogram colouring algorithm"></div>
    </div>
    <figcaption>Comparing smooth colouring algorithms when zoomed in. From left to right: looped palette, histogram.</figcaption>
    <hr class="midrule">
</figure>



### Multithreading with thread pools in C++

The curse of the Mandelbrot set is that computing the colour of one pixel tells you almost nothing of use about the adjacent pixels. Indeed it is this property that gives the set its intriguing fractal nature. However, this does leave the problem of computing pictures of the Mandelbrot set especially susceptible to parallelisation; [embarassingly so](https://en.wikipedia.org/wiki/Embarrassingly_parallel). Since all of the pixels can be computed independelty and in any order, we can levarage the power of a multi-core processor or even a cluster of processors, without worrying about synchronisation problems.

In this project, I used a [simple single-header C++ library which implements the thread pool design pattern](https://www.github.com/vit-vit/ctpl). This pattern consists of a number of threads or "workers" and a container of jobs. As jobs are pushed to the container, idle workers take jobs out of the container and complete them. This prevents the repeated creation and deletion of workers throughout the computation, reducing the computing resources spent on parallelisation and increasing efficieny. Moreover, this approach is easily scalable to computers with a larger number of avilable of processors as this simply requires creating more workers and adding them to the pool.

### Working Code

In [the GitHub repo for this project](https://www.github.com/tomchaplin/Multithreaded_Mandelbrot), I have included a Python file which implements the Hisogram colouring algorithm in a serial fashion. This is quite a slow script due to the natural limitations of Python and lack of parallelisation.

The main content lies in [the C++ Mandelbrot class](https://www.github.com/tomchaplin/Multithreaded_Mandelbrot/blob/master/Cpp/mandelbrot.cpp). This is a flexible class that allows you to easily draw pictures of the Mandelbrot set to a GIF, using any one of the colouring algorithms described above and any number of threads. For an example of how to use this class, please consult the README on the GitHub repo. Below I have provided examples of zooms into the Mandelbrot set using the smooth histogram colouring algorithm.

<figure class = "in_article">
    <hr class="midrule">
        <div class="vid_wrapper"><iframe src="https://www.youtube.com/embed/oKmXogi64Jg" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>
    <figcaption>A selection of smoothly coloured zooms into the Mandelbrot set</figcaption>
    <hr class="midrule">
</figure>

### Next Steps

This C++ class could be used to implement an interactive explorer ([similar to this online explorer](https://guciek.github.io/web_mandelbrot.html#-0.5;0;2;1000)) which would be able to leverage the power of parallel computing to explore the structure of the Mandelbrot set. Moreover, this explorer could first render the images in a lower resolution, allowing the user to quickly plot a path. The program could then trace back along this path at a higher resolution to produce an interesting zoom.

When animating zooms into the Mandelbrot set, choosing a centre point is rather crucial to obtaining a satisfactory result. If poorly chosen, the animation will often result in an indefinite zoom into blackness. For example, zooming directly into the centre of the Mandelbrot set would be somewhat dull. To fix this, we could implement a system which analyses the previous frame and subsequently makes small adjustments to the centre point in order to ensure that we keep zooming into something of interest. The system could then be left computing with less supervision, zooming into the Mandelbrot set until it ran into errors due to floating point precision. This would also require suitably increasing the maximum number of iterations per pixel as we zoom in, so as to ensure that we retain some level of detail.

To further increase the computation speed of this program, one could use the worker pool design pattern to distribute work across a cluster of computers such as Raspberry Pis. Alternatively, or even additionally, the program could be rewritten to leverage GPU acceleration, although such a program would inherently be more tailored to a specific computer. Another way to speed up computation of the Mandelbrot set is through perbutation theory. [Ultra Fractal](https://www.ultrafractal.com/) now supports the 'perbutation calculation algorithm' which allows you to approximately calculate the iteration for points close to a point that has already been calculated. This algorithm was first discovered and implemented by K.I. Martin and the mathematics and algorithm are detailed on the [SuperFractalThing website](http://www.superfractalthing.co.nf/).

These techniques of parallelisation could be applied to similar fractal structures and dynamical systems in the complex plane such as [Julia sets](http://mathworld.wolfram.com/JuliaSet.html).

### Update (circular colouring)

I have implemented some more colouring algorithms into the C++ class.
These are all circular colouring algorithms which loop the provided colour palette around the origin as shown in the picture below.
The colour is chosen based on the hue and saturation from the colour palette and then luminance is chosen based on iteration count so that we can see the Mandelbrot structure.
I have implemented this with a normal colouring algorithm as first described, as well as a histogram version and smooth version using similar techniques to before.

<figure class = "in_article">
    <hr class="midrule">
    <div>
        <div><img src="/assets/portfolio/2018-11-02-Exploring-the-Mandelbrot-Set/statics/circular_test18.png" alt="Smooth circular coloruing algorithm"></div>
    </div>
    <figcaption>Smooth circular colouring algorithm</figcaption>
    <hr class="midrule">
</figure>

In the above picture I used a palette which loops around hue from 0 to 360 degrees with saturation fixed at 50%.
Obviously the colouring effect is centred at the origin so as you zoom in the colouring will become monochromatic, but the shading will still reveal the structure of the Mandelbrot set.

### Update (MPI)

I have recently built a small super-computer consisting of four Raspberry Pi 4s.
As such, I have started the work of translating this code to MPI so that the workload can be distributed across a list of computers on the network via SSH.
While this is still in its infancy, the code is available [here](https://github.com/tomchaplin/MPI_Mandelbrot).
At the moment the code distributes the workload a row at a time>
However, in principle, we could write the code in serial to compute an entire frame, based on command-line parameters, and then distribute the work via [GNU Parallel](https://www.gnu.org/software/parallel/).

### Useful Resources

* [Renormalising the Mandelbrot Set](http://linas.org/art-gallery/escape/escape.html) - Read more about smooth colouring of the Mandelbrot set
* [Coloring Dynamical Systems in the Complex Plane](http://math.unipa.it/~grim/Jbarrallo.PDF) - Read more about colouring algorithms for dynamical systems
* [Thread Pools on Wikipedia](https://en.wikipedia.org/wiki/Thread_pool) - A basic background on the thread pool design pattern
* [Interactive Web Mandelbrot Explorer](https://guciek.github.io/web_mandelbrot.html#-0.5;0;2;1000) - Particularly useful for finding intersting points to zoom into
* [Ultra Fractal](https://www.ultrafractal.com/) - Excellent piece of software, used for generating images of a variety of fractals including the Mandelbrot set
* [SuperFractalThing](http://www.superfractalthing.co.nf/) - First implementation of the perbutation calculation algorithm
