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

As this was my first web development project, we started out by creating a static site using basic HTML, CSS and some Javascript. This allowed us to develop both the aesthetic design for the website and the structure behind the content displayed on the website. We arrived at the initial design for the website, and decided that content would be classified as either a blog post or recipe. This gave us the framework around which we could build the database and server-side logic.

At this point, the website could have gone live; although it was missing some features, the content was displayed almost exactly as it would in the final version. The website was certainly not scaleable as new post required copying and editing previous posts into a new folder then adding the relevant links to other pages. However, the client had not yet finalised the content they wished to publish so we decided to start development of the database and server-side logic.

### Database Approach

After considering the various options, we decided on using PHP for the server-side logic and MySQL for storing the content. This website is not designed to produce a large revenue so would likely be hosted on a shared hosting platform. The majority of these platforms provided MySQL databases and PHP without any additional setup or cost so this was the clear choice. Moreover, PHP provides easy, secure communication with databases through the PDO extension which was used throughout the project. In addition, the language is well documented through the [PHP Manual](http://php.net/manual/en/index.php) and the large, well-established community.

This approach also enabled us to implement a tagging system for the recipes, allowing users to more easily search for recipes relevant to them. Implementing this system presented a design decision as there are a number of approaches to take, each with their own strengths and weaknesses. Phillip Keller has completed [tests on the performance](http://howto.philippkeller.com/2005/06/19/Tagsystems-performance-tests/) of each of these approaches which proved an invaluable resource. As recipes were written rarely, the main focus was on maximising performance for <code>SELECT</code> queries as these would be much more frequent and impact user experience. Thus, based on the expected distribution of our tags, we decided on a three table schema; one for recipes, one for tags and one for tag-maps which list which recipes have which tag (named the "toxi" approach in the linked article). Note, this also the approach used by Wordpress.

### Admin Section

At this stage, a basic form for recipe and blog post entry had been created but editing and deleting posts as well as adding tags had to be done manually within phpMyAdmin. Although, the client was technically literate, this was not ideal and certainly not a long-term solution. The next step of the project was to create an admin section for the website, which would be password protected and provide full control over the content. To implement this, PHP sessions were used to identify logged in users and user information was stored in a MySQL table with passwords salted and hashed using PHP's standard <code>password_hash()</code> function.

To store recipe content, the new entry form features three Markdown Editors using [
<!--stackedit_data:
eyJoaXN0b3J5IjpbNjc1NTI1MDI4LDEyMDAzNDMsOTY1ODg1Mz
A3LDM2NjM5NDUxMSwtMjA1ODAxNzI1OSwtMzU1MzA3NzY3LDIw
NjIyMTM3OTUsLTMxMjU5MzQyNSwtOTEwOTk4OTQ2LC0yMDUzNj
g5NjQ1LDEwNzcyNjk3OTksMTU3NDI5MjgzNl19
-->