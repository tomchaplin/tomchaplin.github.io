---
layout: portfolio
featured_img: /assets/portfolio/2019-12-17-Vim-for-LaTeX/workflow.png
github_link: https://github.com/tomchaplin/dotfiles
---

* Introduction
  * Switched to Arch + i3 for main system ([link to album](https://imgur.com/a/qCT6Wij))
  * Previously using TexMaker on Windows and Overleaf on chromebook
  * Motivation for switch ==> trying out vim
  * Advantages of Vim as an editor + LaTeX as gateway drug
* Options for plugins
  * [Vim-LaTeX / LaTeX-Suite](https://github.com/vim-latex/vim-latex)
    * Fully-featured
    * Good snippets
    * Doesn't use latexmk
    * Didn't play well with vimtex
  * (vimtex)[https://github.com/lervag/vimtex]
    * latexmk just works (removed annoyances of LaTeX)
    * Provides useful motions and text objects
    * Sends update signal to mupdf (forward search)
  * (vim-tex-fold)[https://github.com/matze/vim-tex-fold]
    * Default folding to better organise tex file content
    * Custom folding possible to organise preamble
* Custom settings
  * Keep in ftplugin/tex.vim to keep vimrc clean
  * Automatic compile on entry
  * Spellcheck
* Custom mappings
  * <++> placeholder (,, to navigate)
    * Creating templates (integration with ranger file maanger)
  * Arbitrary environment mapping
  * Standard environments
  * underbrace
  * Fractions
* Next steps
  * Continue to add to mappings
  * Close mupdf on vim exit
  * Send signal to i3-gaps to remove gaps for full screen real estate
  * Setting up Vim for C++ development
* References
  * [Luke Smith on Vim for LaTeX](https://www.youtube.com/watch?v=Mphdtdv2_xs&t=217s)
  * [vimtex on GitHub](https://github.com/lervag/vimtex)
  * [vim-tex-fold on Github](https://github.com/matze/vim-tex-fold)

I recently made the switch from Ubuntu with the XFCE desktop environment to Arch Linux with the i3 window manager for my main OS. This was quite the culture shock and took a while to get everything up and running and even longer to get it configure how I wanted. But, now I have a working system that's configured for how I use my dekstop and how I want it to look. [Click here for a small album of some screenshots of my desktop](https://github.com/vim-latex/vim-latex).

As a maths student, I am often using LaTeX to type up my assignments or write notes for my classes. Given its power and flexibility, I also use it for almost all documents that I write these days, such as letters and CVs. Before now, I had predominantly been using [TexMaker](http://www.xm1math.net/texmaker/) when I was using Windows and later [Overleaf](https://www.overleaf.com/project) when I switched to Ubuntu. These were great LaTeX editors whose feature set I probably never exhausted but they didn't quite fit with my new system. I wanted an editor that was lightweight, highly customisable, ran locally and could seamlessly update a `pdf` while I typed.

Vim was the obvious choice. It is an unquestionably powerful text editor which runs in the terminal on practically any computer and is famously configurable. The main downside of Vim is obviously the learning curve. But, with `vimtutor` and a whole host of resources avaiable online I decided it was worth the effort. Moreover, LaTeX seemed to be the perfect gateway drug. LaTeX is a fantastic type setting language but its syntax is awfully clunky and repetitive so it seems highly susceptible to Vim's editing power.
