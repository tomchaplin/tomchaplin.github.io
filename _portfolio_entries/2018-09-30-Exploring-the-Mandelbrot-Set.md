---
layout: portfolio
featured_img: /assets/portfolio/2018-09-30-Exploring-the-Mandelbrot-Set/mandelbrot.jpg
display_latex: true
---
The Mandelbrot set has become an ambassador for the beauty of mathematics. Its hypnotic, infinitely complex structure has astounded mathematicians and non-mathematicians alike and has been a subject of mathematical research for decades. Interested in the structure and behaviour of the Mandelbrot set, I used Python to animate zooms into this captivating fractal.
<!--more-->

### Formal Definition
First, for every \\(c\in\mathbb{C}\\) we associate the function \\( f_c: \mathbb{C}\to\mathbb{C},\;z\mapsto z^2 + c \\). Then define a sequence \\( \left( z\_{c,n} \right)\_{n=1}^\infty \\) by \\(z\_{c,0}=0\\) and \\(z\_{c,n+1}=f(z\_{c,n})\\). Now we can define the Manelbrot set to be
\\[ M := \\{c\in\mathbb{C} : \left(z\_{c,n}\right) \text{is a bounded sequence}\\}.\\]

{% raw %}
\\[ f_c(z) = z^2 + c \\]
{% endraw %}
