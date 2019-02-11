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
