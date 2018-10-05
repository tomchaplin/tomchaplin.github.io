---
layout: portfolio
featured_img: /assets/portfolio/2018-09-30-Exploring-the-Mandelbrot-Set/mandelbrot.jpg
display_latex: true
---
The Mandelbrot set has become an ambassador for the beauty of mathematics. Its hypnotic, infinitely complex structure has astounded mathematicians and non-mathematicians alike and has been a subject of mathematical research for decades. Interested in the structure and behaviour of the Mandelbrot set, I used Python to animate zooms into this captivating fractal.
<!--more-->

### Formal Definition
First, for every \\(c\in\mathbb{C}\\) we define the function \\( f_c: \mathbb{C}\to\mathbb{C},\;z\mapsto z^2 + c \\) and subsequently the sequence \\( \left( z\_{c,n} \right)\_{n=0}^\infty \\) by \\(z\_{c,0}=0\\) and \\(z\_{c,n+1}=f(z\_{c,n})\\). Now we can define the Manelbrot set to be
\\[ M := \\{c\in\mathbb{C} : \left(z\_{c,n}\right) \text{is a bounded sequence}\\}.\\]
In order to compute whether a given point of the complex plane lies within the Mandelbrot set, we require a simpler criterium. Thus, we introduce an escape radius \\(r>0\\) which we choose with the property that if \\(|z_{c,n}|>r\\) for some \\(n\in\mathbb{N}\\) then we may conclude \\(c\in M\\).
