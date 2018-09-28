---
layout: portfolio
featured_img: /assets/portfolio/2018-09-20-The-Ugly-Croissant/desktop_index.png
---
The Ugly Croissant presented the opportunity to learn the fundamentals of the web, focusing on responsive design. We used PHP to produce a content managment system which could handle both recipes and blogposts, and implemented a tagging system to help organise the content. Throughout the process we worked closely with the client to get the design right for her and her audience.
<!--more-->

### Design Approach

From the start of the project, responsive design was at the top of the agenda. The client had already amassed a following on social media and was seeking a website in order to grow her presence and display her recipes to her followers. As such, the website had to be designed with a mobile first approach from day one as the vast majority of traffic would be mobile. This was achieved through the use of the <code>viewport</code> meta tag, CSS media queries and CSS grids.

[Research](https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/) has time and again shown that fast page load speed is vital to decreasing bounce rate so this was an ongoing pirority throughout the project. Its no secret that good photos sell food, so in order to engage the largest audience possible good quality photos had to be front and centre. To allow for the highest quality photos possible the rest of the website had to be lightweight and fast. Throughout development we conducted page load tests using [Google's Lighthouse Tool](https://developers.google.com/web/tools/lighthouse/). Moreover, in order to keep the website lightweight and flexible we implemented a custom content managment system to serve the content quickly.

Whilst the blog only has one author, it was still necessary to create a scalable solution to allow for content to be effortlessly published on the website. This is achievabe with a static site through a smart naming scheme and structured file system. However, storing the content on a database and using PHP to load the content posed a much more robust, scalable solution. Moreover, this would allow for easier implementation of features as recipe tagging, searching and commenting in the future. Also, using PHP would help prevent repeated code in the website and make it easier to change the site throghout developlment and in the future.
