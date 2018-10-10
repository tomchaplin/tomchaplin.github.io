---
layout: portfolio
featured_img: /assets/portfolio/2018-09-20-The-Ugly-Croissant/desktop_index.jpg
external_link: https://www.theuglycroissant.com
---
The Ugly Croissant presented the opportunity to learn the fundamentals of the web, focusing on responsive design. I used PHP to produce a basic content management system which could handle both recipes and blog posts, and implemented a tagging system to help organise the content. Throughout the process I worked closely with the client to get the design right for her and her audience.
<!--more-->

### Technologies used
* HTML
* CSS
* JavaScript
* jQuery, jQuery UI
* PHP
* MySQL
* Git with GitHub

### Development Approach

From the start of the project, responsive design was at the top of the agenda. The client had already amassed a following on social media and was seeking a website in order to grow her presence and display her recipes to her followers. As such, the website had to be designed with a mobile first approach from day one as the vast majority of traffic would be mobile. This was achieved through the use of the <code>viewport</code> meta tag, CSS media queries and CSS grids.
<figure>
    <hr class="midrule">
    <div class="side_by_side">
        <div><img src="/assets/portfolio/2018-09-20-The-Ugly-Croissant/desktop_index.jpg" alt="TUC Home Page on a Mobile Device"></div>
        <div><img src="/assets/portfolio/2018-09-20-The-Ugly-Croissant/mobile_index.jpg" alt="TUC Home Page on a Mobile Device"></div>
    </div>
    <figcaption>Desktop vs. mobile layout</figcaption>
    <hr class="midrule">
</figure>
Research has time and again shown that fast [page load speed is vital to decreasing bounce rate](https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/) so this was an ongoing pirority throughout the project. Its no secret that good photos sell food, so in order to engage the largest audience possible good quality photos had to be front and centre. To allow for the highest quality photos possible the rest of the website had to be lightweight and fast. Throughout development I conducted page load tests using [Google's Lighthouse tool](https://developers.google.com/web/tools/lighthouse/). Moreover, in order to keep the website lightweight and flexible I implemented a custom content management system to serve the content quickly.

Whilst the blog only has one author, it was still necessary to create a scalable solution to allow for content to be effortlessly published on the website. This is achievable with a static site through a smart naming scheme and structured file system. However, storing the content on a database and using PHP to load the content posed a much more robust, scalable solution. Moreover, this would allow for easier implementation of features such as recipe tagging, searching and commenting in the future. Also, using PHP would help prevent repeated code in the website, thus saving work and make it easier to change the site throughout development and in the future.

### Workflow

From the outset we used Git and GitHub for version control, this provided an invaluable tool for managing the codebase for the site, especially in the early days when both author and developer were working together on the site. Moreover, when we eventually started migrating the site to use the database, this allowed us to maintain a working static version of the site alongside the main development, should the author want to publish that site earlier. Development was done largely on my local Linux machine, running XAMPP for a basic local web server and using Atom for text editing.

### Early Development

As this was my first web development project, I started out by creating a static site using basic HTML, CSS and some JavaScript. This allowed us to develop both the aesthetic design for the website and the structure behind the content displayed on the website. We arrived at the initial design for the website, and decided that content would be classified as either a blog post or recipe. This gave me the framework around which I could build the database and server-side logic.

At this point, the website could have gone live; although it was missing some features, the content was displayed almost exactly as it would be in the final version. The website was certainly not scaleable as new post required copying and editing previous posts into a new folder then adding the relevant links to other pages. However, the client had not yet finalised the content they wished to publish so we decided to start development of the database and server-side logic.

### Database Approach

After considering the various options, I decided on using PHP for the server-side logic and MySQL for storing the content. This website is not designed to produce a large revenue so would likely be hosted on a shared hosting platform. The majority of these platforms provided MySQL databases and PHP without any additional setup or cost so this was the clear choice. Moreover, PHP provides easy, secure communication with databases through the PDO extension which was used throughout the project which protects against SQL injection attacks through prepared statements. In addition, the language is well documented through the [PHP Manual](http://php.net/manual/en/index.php) and the large, well-established community.

This approach also enabled us to implement a tagging system for the recipes, allowing users to more easily search for recipes relevant to them. Implementing this system presented a design decision as there are a number of approaches to take, each with their own strengths and weaknesses. Phillip Keller has completed [tests on the performance](http://howto.philippkeller.com/2005/06/19/Tagsystems-performance-tests/) of each of these approaches which proved an invaluable resource. As recipes were written rarely, the main focus was on maximising performance for <code>SELECT</code> queries as these would be much more frequent and impact user experience. Thus, based on the expected distribution of our tags, we decided on a three table schema; one for recipes, one for tags and one for tag-maps which list which recipes have which tag (named the "toxi" approach in the linked article). Note, this is also the approach used by Wordpress.

### Pagination and Object-Oriented PHP

With all of the recipes and blog posts stored and tagged in a database, this allowed me to create a search page where users could search the site for recipes that interested them. However, returning these results on one page would lead to long page load times and a cumbersome experience for the user. To solve this issue, we needed to automatically paginate the results from the relevant database query. Aware that this was a common problem that might arise on future projects I created a tool for paginating results from a data base query. Using an object-oriented approach, this tool is highly portable and can be integrated into any site in the future. [View the PHP Paginator on GitHub](https://github.com/tomchaplin/PHP_Paginator/).

Using the object-oriented approach was a much more organised approach to writing PHP, and taking the time to write portable code such as this will definitely pay off in the long run. Within this project, the paginator class was used on multiple occasionas to organise results from the database.

### Admin Section

At this stage, a basic form for recipe and blog post entry had been created but editing and deleting posts as well as adding tags had to be done manually within phpMyAdmin. Although the client was technically literate, this was not ideal and certainly not a long-term solution. The next step of the project was to create an admin section for the website, which would be password protected and provide full control over the content. To implement this, PHP sessions were used to identify logged in users and user information was stored in a MySQL table with passwords salted and hashed using PHP's standard <code>password_hash()</code> function.

To collect recipe content, the new entry form features three Markdown editors using [SimpleMDE](https://simplemde.com/), allowing the author to tailor the introduction, ingredients and method of the recipe. Markdown was chosen as it allows the author to focus on writing the content, and prevents any issues that asking the author to write HTML may cause with the rest of the site. This Markdown is converted into safe HTML by Emanuil Rusev's [Parsedown](www.parsedown.org) and the two formats are stored in the database. This allows the content to be quickly loaded to the website, whilst allowing for future editing of the original Markdown.

One standout feature of the user interface is the tag system; when publishing a recipe or blog post, the author is able to add tags to their post. This is accomplished through an AJAX live search box which searches the datbase for pre-existing tags as the author types. The first step, was to create a PHP file which excepts the query through the <code>GET</code> method and echoes a table of results from the database. Then, when the contents of the search box are updated, a HTTP request is made to this file and the content received is embedded into the page. This provides a seamless experience for the author as there are no page reloads, making tags quicker and easier to add before posting.

<figure>
    <hr class="midrule">
    <div>
        <div><img src="/assets/portfolio/2018-09-20-The-Ugly-Croissant/tuc_admin_demo.gif" alt="TUC Admin Section demo"></div>
    </div>
    <figcaption>Demonstration of the admin section</figcaption>
    <hr class="midrule">
</figure>

### Lessons Learned

This project provided a great opportunity to develop my understanding of the funadmentals of the web; HTML, CSS and JavaScript. Moreover, I had the opportunity to learn PHP and MySQL which are fantastic tools for quickly creating dynamic sites which can easily scale to accomodate more content. Learning about the basics of security was a valuable experience, as I had to ensure the site was protected against common attacks such as SQL injection and cross-site scripting.

Working with PHP had its strengths and weaknesses, the language offers excellent integration with databases out of the box, making it ideal for web development. The massive community, and manual make troubleshooting relatively painless in most cases. The dynamic typing of PHP allows the devloper to spend less time dealing with pedantic issues such as changing the type of a single variable throughout an entire code base. However, static typing makes for inherintly more rigorous code which reduces the likelihood of careless errors at the cost of writing arguably over-verbose code. Moreover, using the naive approach to PHP development of basic scripts nestled amonst HTML, code can quickly become disorganised and difficult to maintain.

If using PHP in a larger future project, I would attempt to use an object-oriented approach from the start as it allows the developer to foster a more organised code base which is more managable as the project grows. Moreover, using a PHP framework such as Laravel would allow for swifter, more elegant coding, through greater conformity to the MVC pattern which is prolofic in modern web development. On a similar note, in order to create a more organised style sheet, I would use a CSS pre-processor such as SCSS for its nesting and logic. The front-end codebase of this project was intentionally small to reduce the load on mobile devices so JavaScript frameworks were avoided. However, in larger projects, more dependent on their front-end, the power of JavaScript frameworks makes them an attractive option.

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTg0NTMxOTQxOCwxMzMxMTUxODMyLDE1ND
UyNDMwNTQsLTE4OTczNTU4ODksMTAxMDU1NDg1NywxMTE0MzMw
ODA4LDEyMDAzNDMsOTY1ODg1MzA3LDM2NjM5NDUxMSwtMjA1OD
AxNzI1OSwtMzU1MzA3NzY3LDIwNjIyMTM3OTUsLTMxMjU5MzQy
NSwtOTEwOTk4OTQ2LC0yMDUzNjg5NjQ1LDEwNzcyNjk3OTksMT
U3NDI5MjgzNl19
-->
