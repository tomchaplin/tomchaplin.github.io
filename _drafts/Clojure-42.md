---
layout: portfolio
featured_img: /assets/portfolio/2018-09-20-The-Ugly-Croissant/featured_img.png
title: (= Clojure 42)
---
Clojure is a functional programming language with an emphasis on immutability and strong interoperability with its host environment.
It's focus on pure functions, that depend only on their arguments, is a natural setting for mathematicians.
Meanwhile, immutability fosters a simple yet expressive style of programming, ready for concurrency.
On the other hand, despite it's apparent disdain for mutable state, Clojurescript offers arguably the most compelling approach to UI development available today.

<!--more-->

### Functional Programming

* What is functional programming?
* Give maths context

### Immutability

* What is immutability?
* Give maths context
* Some things have to be mutable, resolution?
* Speed concerns? - Persistent data structures

### Mathematics

* First-class sets!
* Mapper algorithm example

### Web Development

* Seems counter-intuitive; UI is inherently stateful
* React v=f(s)
	- Isolate s
	- Good developer experience - fix s, change f, observe v.
* Re-frame
	- Describe events by the changes they should affect
	- Affect those changes to mutate s (and the rest of the world)
	- Recompute f
	- Make sure f is a composite of subscriptions
	- = in Clojure
* Shadow-CLJS for NPM integration

### Native Applications

* React Native plays nicely
* Expo is great

### Sticking Points
