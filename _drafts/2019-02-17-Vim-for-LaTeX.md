---
layout: portfolio
featured_img: /assets/portfolio/2019-12-17-Vim-for-LaTeX/workflow.png
github_link: https://github.com/tomchaplin/dotfiles
---

* Introduction
  * Switched to Arch + i3 for main system (link to album)
  * Previously using TexMaker on Windows and Overleaf on chromebook
  * Motivation for switch ==> trying out vim
  * Advantages of Vim as an editor
* Options for plugins
  * Vim-LaTeX / LaTeX-Suite
    * Fully-featured
    * Good snippets
    * Doesn't use latexmk
    * Didn't play well with vimtex
  * vimtex
    * latexmk just works (removed annoyances of LaTeX)
    * Provides useful motions and text objects
    * Sends update signal to mupdf (forward search)
* Custom settings
  * Keep in ftplugin/tex.vim to keep vimrc clean
  * Automatic compile on entry
  * Spellcheck
  * <++> placeholder (,, to navigate)
  * Arbitrary environment mapping
  * Standard environments
  * underbrace
  * Fractions
* References
  * [Luke Smith on LaTeX in Vim](https://www.youtube.com/watch?v=Mphdtdv2_xs&t=217s)
  * [vimtex on GitHub](https://github.com/lervag/vimtex#alternatives)
