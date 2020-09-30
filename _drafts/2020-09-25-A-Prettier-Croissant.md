---
layout: portfolio
featured_img: /assets/blog/A-Prettier-Croissant/feature.jpg
github_link: https://github.com/theuglycroissant/tuc/
external_link: http://www.theuglycroissant.com
---
Two years ago I got back into web development by building a blogging platform for my girlfriend's egg-free baking blog.
The project was built in PHP, equipped with server-side rendering and a bespoke CMS.
Frankly, it was a mess.
Having spent some time working professionally with React, I was itching to give the site a much needed update.

<!--more-->

### Design Goals

There were a few criteria that we wanted to hit that largely dictated the decisions I made this time around:

*  **Cheaper**.
The blog was mainly a hobby so wasn't bringing any ad revenue so the annual cost of PHP hosting was too much.

* A better **user experience**.
The previous site was clunky, difficult to navigate and, true to the blog's name, ugly.
This time we wanted the food to really take center stage, and make recipes easier to find.

* **Faster**.
The content is extremely static so there was no need for carrying around huge chunks of Javascript.
The pages should be as lightweight as possible and ideally pre-rendered, which would also help with SEO.

* **Searchable**.
Being able to easily find recipes was the site's raison d'être; recipes should be search by both text and tags.

It's also important to note a few things that *weren't* design goals:

* A big CMS.
Last time I spent ages building a massive, user-friendly CMS.
Nikki is more than comfortable editing files and running utilities at the command line so that wasn't necessary this time.

* Scalability.
Nikki is the sole contributor to the blog and does it mainly as a hobby, so the site didn't need to handle hundred of recipes.

### The stack

To keep things cheap, we decided to use a static site generator so that the site could be published on Github Pages or Netlify for free.
Pretty much all of Nikki's content is recipes, which are highly structured, and thus it made sense to write and store them as YAML files.
This also had the added benefit of making it easier to add [structured data](https://developers.google.com/search/docs/data-types/recipe) later down the line.

The front-end was largely static and so it made sense to steer clear of massive frameworks and just use Vanilla JS when necessary.
The static site generator just needed to feed a bunch of YAML files through a template, and spit out some HTML.
The only sticking point was making the website searchable.
Usually this is handled by AJAX requests to some sort of server, but we wanted to keep things cheap.

The budding Javascript developer in me was itching to use a serverless cloud provider like AWS Lambda, but that seemed a bit overkill.
Moreover, since the site wasn't getting much traffic, startup times might be fairly noticeable; not great for UX!
Not to mention, if we could get away without paying for any back-end then we definitely wanted to.

One alternative was to use the client for searching.
At build time we can package metadata such as tags, titles and descriptions into some static JSON files, which the user's browser can then download and search through.
Specifically, we create one JSON file which records which recipes belong to each tag, and another JSON file which contains the titles and descriptions of each recipe, for text searching.
We are essentially creating a static API; the endpoints accept no query parameters and responses are unchanged between releases.
Note this doesn't scale very well, but the site didn't have too many recipes so it seemed like a good compromise.
Here is a snippet of the JSON produced.

	[
	  {
		"link": "/recipes/apple_crumble_tart/recipe.html",
		"title": "Apple Crumble Tart",
		"card_photo": "/recipes/apple_crumble_tart/Apple_Tart_Square.jpg",
		"description": "Maybe not quite your Grandma’s apple crumble, but this is a really tasty alternative....",
		"featured": false,
		"tags": [
		  "tart",
		  "apple"
		],
		"date": "25/06/2020",
		"dateObject": "2020-06-24T23:00:00.000Z"
	  }
	  ...
	]


I tried playing around with a few static site generators on the market but couldn't quickly wrangle one of them to do what I wanted.
I needed the tool to accept YAML input, produce HTML via EJS templates and print a few output JSON files based on tags.
In the end I decided it was quicker and easier to write my own build tool and you can see the results [here](https://github.com/theuglycroissant/tuc/blob/master/build.js).
As with the old site, its a bit of a mess but it gets the job done.

<figure class = "in_article">
    <hr class="midrule">
	<div>
        <div><img src="/assets/blog/A-Prettier-Croissant/recipe_page.jpg" alt="The new recipe display page"></div>
	</div>
    <figcaption>Visually separating semantically different components makes a world of difference.</figcaption>
    <hr class="midrule">
</figure>

The final piece of the puzzle was to write some JS on the front-end to read the JSON and process the search request.
For this I used some simple custom vanilla JS to search via tags and [Fuse.js](https://fusejs.io/) to search via text.
The code for the front-end searching is [here](https://github.com/theuglycroissant/tuc/blob/master/src/app/search.js).

### Design

The old site felt really claustrophobic; there was little or no white spacing between the various components and far too many dividing border lines.
This resulted in pages that felt boxy and were really unpleasant to read.
Our remedy was to give semantically distinct elements room to breath with a good helping of padding and margin.

The old site was very *flat* which meant the background and foreground didn't feel sufficiently separated, compounding this feeling of claustrophobia.
This is where box shadows shine.
Adding shadows in the right places made the site feel more physical; recipes were written on paper that sat on top of the background.
This mimicry of physical objects in graphical interfaces is the foundation of [material design](https://material.io/design/introduction#principles).

<figure class = "in_article">
    <hr class="midrule">
	<div>
        <div><img src="/assets/blog/A-Prettier-Croissant/recipe_page.jpg" alt="The new recipe display page"></div>
	</div>
    <figcaption>Visually separating semantically distinct components makes a world of difference.</figcaption>
    <hr class="midrule">
</figure>

Possibly the single best change we made was to the user flow.
Previously, the landing page for the site consisted of a few links to some written blog posts and a carousel showing just one recipe at a time.
The user would have to click through three links to actually arrive at the recipe search page!
Given that this was mainly a site for sharing recipes, this was terrible UX and didn't do the content justice at all.

Nikki didn't really enjoy writing the blog posts so we stripped those out entirely.
Now, when you arrive, there are a number of featured recipes to choose from, and give links to the recipe search page.
Three of these links pre-populate the search page with a tag and the other two just display all of the recipes.
It's now far easier for the user to find the recipe they want, and every page is full of photos which is crucial to a good recipe site!

<figure class = "in_article">
    <hr class="midrule">
    <div>
        <div><img src="/assets/blog/A-Prettier-Croissant/home_page.jpg" alt="The new home page"></div>
    </div>
    <figcaption>The new landing page pushes people straight to the recipes.</figcaption>
    <hr class="midrule">
</figure>

### Lessons learned

The over-arching theme of this entire rebuild was a focus on **simplicity**.
We replaced a bloated, spaghetti-code CMS, built on top of web servers, database and jQuery, with files.
We replaced a busy, over-populated design with a few simple components and gave them all room to breath.
We replaced a complicated and confusing user flow with a content-first landing page and a simple search page.
When working on projects like these it's easy to get carried away with building a system that can scale.
But, if you've only got 10 recipes to deal with, then keep it simple!

Having said that, I'm sure I've still over-complicated the current site.
There is almost certainly a static site generator out there that I could have configured to do what I want (resulting in much less complexity for me to manage).
Alternatively, I have since done a lot of work with the task runner Gulp.
I think a lot of the complexity of my build tool could have been better managed by wrapping it up inside some Gulp tasks.

With that said, the new site is definitely a marked improvement on the last version and is significantly cheaper to run.
If you're interested in egg-free baking, or just yummy things in general then please do head over to [The Ugly Croissant](http://www.theuglycroissant.com) and check it out.
