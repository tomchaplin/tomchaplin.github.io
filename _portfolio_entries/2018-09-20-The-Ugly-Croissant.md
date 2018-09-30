---
layout: portfolio
featured_img: /assets/portfolio/2018-09-20-The-Ugly-Croissant/desktop_index.png
external_link: https://www.theuglycroissant.com
---
The Ugly Croissant presented the opportunity to learn the fundamentals of the web, focusing on responsive design. We used PHP to produce a content management system which could handle both recipes and blog posts, and implemented a tagging system to help organise the content. Throughout the process we worked closely with the client to get the design right for her and her audience.
<!--more-->

### Technologies used
* HTML
* CSS
* JavaScript
* jQuery, jQuery UI
* PHP
* MySQL

### Development Approach

From the start of the project, responsive design was at the top of the agenda. The client had already amassed a following on social media and was seeking a website in order to grow her presence and display her recipes to her followers. As such, the website had to be designed with a mobile first approach from day one as the vast majority of traffic would be mobile. This was achieved through the use of the <code>viewport</code> meta tag, CSS media queries and CSS grids.

[Research](https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/) has time and again shown that fast page load speed is vital to decreasing bounce rate so this was an ongoing pirority throughout the project. Its no secret that good photos sell food, so in order to engage the largest audience possible good quality photos had to be front and centre. To allow for the highest quality photos possible the rest of the website had to be lightweight and fast. Throughout development we conducted page load tests using [Google's Lighthouse Tool](https://developers.google.com/web/tools/lighthouse/). Moreover, in order to keep the website lightweight and flexible we implemented a custom content management system to serve the content quickly.

Whilst the blog only has one author, it was still necessary to create a scalable solution to allow for content to be effortlessly published on the website. This is achievable with a static site through a smart naming scheme and structured file system. However, storing the content on a database and using PHP to load the content posed a much more robust, scalable solution. Moreover, this would allow for easier implementation of features as recipe tagging, searching and commenting in the future. Also, using PHP would help prevent repeated code in the website, thus saving work and make it easier to change the site throughout development and in the future.

### Early Development

As this was my first web development project, we started out by creating a static site using basic HTML, CSS and some JavaScript. This allowed us to develop both the aesthetic design for the website and the structure behind the content displayed on the website. We arrived at the initial design for the website, and decided that content would be classified as either a blog post or recipe. This gave us the framework around which we could build the database and server-side logic.

At this point, the website could have gone live; although it was missing some features, the content was displayed almost exactly as it would in the final version. The website was certainly not scaleable as new post required copying and editing previous posts into a new folder then adding the relevant links to other pages. However, the client had not yet finalised the content they wished to publish so we decided to start development of the database and server-side logic.

### Database Approach

After considering the various options, we decided on using PHP for the server-side logic and MySQL for storing the content. This website is not designed to produce a large revenue so would likely be hosted on a shared hosting platform. The majority of these platforms provided MySQL databases and PHP without any additional setup or cost so this was the clear choice. Moreover, PHP provides easy, secure communication with databases through the PDO extension which was used throughout the project. In addition, the language is well documented through the [PHP Manual](http://php.net/manual/en/index.php) and the large, well-established community.

This approach also enabled us to implement a tagging system for the recipes, allowing users to more easily search for recipes relevant to them. Implementing this system presented a design decision as there are a number of approaches to take, each with their own strengths and weaknesses. Phillip Keller has completed [tests on the performance](http://howto.philippkeller.com/2005/06/19/Tagsystems-performance-tests/) of each of these approaches which proved an invaluable resource. As recipes were written rarely, the main focus was on maximising performance for <code>SELECT</code> queries as these would be much more frequent and impact user experience. Thus, based on the expected distribution of our tags, we decided on a three table schema; one for recipes, one for tags and one for tag-maps which list which recipes have which tag (named the "toxi" approach in the linked article). Note, this also the approach used by Wordpress.

#### Pagination and Object-Oriented PHP

With all of the recipes and blog posts stored and tagged in a database, this allowed us to create a search page where users could search the site for recipes that interested them. However, returning these results on one page would lead to long page load times and a cumbersome experience for the user. To solve this issue, we needed to automatically paginate the results from the relevant database query. Aware that this was a common problem that might arise on future projects we created a tool for paginating results from a data base query. Using an object-oriented approach, this tool is highly portable and can be integrated into any site in the future. [View the PHP Paginator on GitHub](https://github.com/tomchaplin/PHP_Paginator/).

Using the object-oriented approach was a much more organised approach to writing PHP, and taking the time to write portable code such as this will definitely pay off in the long run.

### Admin Section

At this stage, a basic form for recipe and blog post entry had been created but editing and deleting posts as well as adding tags had to be done manually within phpMyAdmin. Although, the client was technically literate, this was not ideal and certainly not a long-term solution. The next step of the project was to create an admin section for the website, which would be password protected and provide full control over the content. To implement this, PHP sessions were used to identify logged in users and user information was stored in a MySQL table with passwords salted and hashed using PHP's standard <code>password_hash()</code> function.

To store recipe content, the new entry form features three Markdown editors using [SimpleMDE](https://simplemde.com/) allowing the author to tailor the introduction, ingredients and method of the recipe. Markdown was chose as it allows the author to focus on writing the content and prevents any issues that asking the author to write HTML may cause with the rest of the site. This Markdown is converted into safe HTML by Emanuil Rusev's [Parsedown](www.parsedown.org) and the two formats are stored in the database. This allows the content to be quickly loaded to the website, whilst allowing for future editing of the original Markdown.

Most of the interface is implemented with PHP but some more complex user interactions were handled with jQuery and jQuery UI. One major downfall of [jQuery UI](http://jqueryui.com/) is its incompatibility with touchscreen devices, 

### Lessons Learned

* Learnt fundamentals of web and databases
* Power of CSS grids
* Strengths and shortcomings of PHP
* Object-oriented PHP is much more organised

Next-time:
* Object-oriented from start
* CSS pre-processor
* More open to using
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQyMTc5NDU5OSwxNTQ1MjQzMDU0LC0xOD
k3MzU1ODg5LDEwMTA1NTQ4NTcsMTExNDMzMDgwOCwxMjAwMzQz
LDk2NTg4NTMwNywzNjYzOTQ1MTEsLTIwNTgwMTcyNTksLTM1NT
MwNzc2NywyMDYyMjEzNzk1LC0zMTI1OTM0MjUsLTkxMDk5ODk0
NiwtMjA1MzY4OTY0NSwxMDc3MjY5Nzk5LDE1NzQyOTI4MzZdfQ
==
-->