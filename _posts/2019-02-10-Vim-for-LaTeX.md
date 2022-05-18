---
layout: portfolio
featured_img: /assets/portfolio/2019-02-10-Vim-for-LaTeX/feature_img.png
github_link: https://github.com/tomchaplin/dotfiles
featured: false
---

As a maths student, I am often using LaTeX to type up my assignments or write notes for my classes.
Given its power and flexibility, I also use it for almost all documents that I write these days, such as letters and CVs.
Before now, I had predominantly been using [TexMaker](http://www.xm1math.net/texmaker/) and later [Overleaf](https://www.overleaf.com/project) when I switched to Ubuntu.
These were great LaTeX editors whose feature set I probably never exhausted, but they didn't quite fit with my new system.
I wanted an editor that was lightweight, highly customisable, ran locally and could seamlessly update a `pdf` while I typed.
Vim was the obvious choice.

<!--more-->
This change in editor was motivated by my switch from Ubuntu with the XFCE desktop environment to Arch Linux with the i3 window manager for my main OS.
This was quite the culture shock and took a while to get everything up and running and even longer to get it configured how I wanted.
But, now I have a working system that's optimised for my personal workflow and looks the way I want ([click here for a small album of some screenshots of my desktop](https://imgur.com/a/qCT6Wij)).
I wanted a text editor that would match the configurability of the rest of my desktop, preferably running in the terminal.

Vim is an unquestionably powerful text editor which runs on practically any computer and is famously configurable.
The main downside of Vim is obviously the learning curve.
But, with `vimtutor` and a whole host of resources available online, I decided it was worth the effort.
Moreover, LaTeX seemed to be the perfect gateway drug to learning Vim.
LaTeX is a fantastic type setting language but its syntax is awfully clunky and repetitive so it seemed highly susceptible to Vim's editing power.

### Vim plugins for LaTeX

There are a number of great Vim plugins for LaTeX, all with their respective pros and cons.
Some plugins are highly opinionated and turn Vim into a fully featured LaTeX editor with no configuration needed.
Others provide basic functionality specific to LaTeX editing but leave other features such as snippets and autocompletion to other plugins.
This adheres more to the UNIX philosophy of "do one thing and do it well" and so was my preference.
I'll give a quick-summary of the main options here.

#### Vim-LaTeX/LaTeX-Suite

[LaTeX-Suite](https://github.com/vim-latex/vim-latex) is a fully featured plugin for Vim with an enormous feature set, great configurability and fantastic documentation.
If you want a plugin that provides all the features of a conventional LaTeX editor alongside the power of Vim, this is the plugin for you.
However, I struggled to setup automatic previews with my PDF viewer `mupdf` and it doesn't use `latexmk`, which greatly eases the pain of LaTeX compilation.
Moreover, given its objective, it is not very modular and so doesn't play well with other plugins that can provide this functionality.

#### vimtex

In the end I decided to use [vimtex](https://github.com/lervag/vimtex) for my main plugin.
It builds on the language of Vim by providing a number of LaTeX specific text objects and motions for use in your editing.
Moreover, vimtex was very easy to setup with my PDF viewer such that the viewer was updated every time I saved my `tex` file.
Also, I can use `<localleader>lv` to do a forward search and show the part of the document I'm currently editing in my PDF viewer.
This compilation is done seamlessly through `latexmk` and errors are displayed inside a Vim buffer.
The main feature missing from `vimtex` is the lack of a full snippet feature but this can easily be handled by a dedicated plugin such as `neosnippet`.

<figure class = "in_article">
    <hr class="midrule">
    <div>
        <div><img src="/assets/portfolio/2019-02-10-Vim-for-LaTeX/side_by_side.png" alt="Autocompilation with vimtex"></div>
    </div>
    <figcaption>Autocompilation with vimtex</figcaption>
    <hr class="midrule">
</figure>

#### vim-tex-fold

[vim-tex-fold](https://github.com/matze/vim-tex-fold) is a great little plugin that automatically folds up sections and specified environments within your `tex` file.
This makes navigating about your document much quicker and easier.
The great thing about this plugin is it allows you to specify custom fold points with comments, allowing you to fold up any section of your document.
This can help clean up the messy preamble that often gets in the way when editing LaTeX files.

<figure class = "in_article">
    <hr class="midrule">
    <div class="side_by_side">
        <div><img src="/assets/portfolio/2019-02-10-Vim-for-LaTeX/fully_folded.png" alt="LaTeX file fully folded up by Vim"></div>
        <div><img src="/assets/portfolio/2019-02-10-Vim-for-LaTeX/unfolded.png" alt="LaTeX file partially folded by Vim"></div>
    </div>
    <figcaption>Folding LaTeX files in Vim with vim-tex-fold for easier editing</figcaption>
    <hr class="midrule">
</figure>

### Custom settings

All of my custom settings are kept in `ftplugin/tex.vim` so that I don't clutter up my `vimrc` with a load of filetype-specific settings and mappings.
To make sure all these settings work just put 

	filetype plugin syntax on
	
in your `vimrc`.
For my full settings please see [my dotfiles](https://github.com/tomchaplin/dotfiles), here are the most important ones.

These two lines make sure vimtex opens up `mupdf` and starts auto-compiling when the editor starts.

    let g:vimtex_view_method = "mupdf"
    autocmd VimEnter *.tex VimtexCompile

This line turns on spell check.

    set spell spelllang=en_gb

This line creates a mapping for folding everything up in the document but leaving the current line visible. We will use it in some later mappings.

	nnoremap zl zMzv

### Custom mappings
These custom mappings fill the gap that vimtex leaves behind.
I often find myself typing the same LaTeX code over and over again at which point I write a mapping which automates this process for me.
Most of these are just mapped in insert mode because they are shortcuts for commands I want to insert.
They are all preceded by my local leader `,` which was chosen because when writing text a comma is almost always followed by a space so this prevents accidental misuse.

#### Placeholders

Many `tex` commands use multiple arguments resulting in constant mode switching in order to move between brackets.
This quickly became an annoyance.
To alleviate this issue, I have used placeholders, namely `<++>`, which are inserted by the mappings in places where I will usually want to jump.
Then by pressing `,,` I can navigate to the next placeholder after the cursor and start typing in its place.
This is implemented in the following Vimscript which I have adapted from [Luke Smith](https://github.com/LukeSmithxyz/voidrice/blob/master/.config/nvim/init.vim).

	inoremap <leader><leader> <Esc>/<++><Enter>zl"=c4l
	vnoremap <leader><leader> <Esc>/<++><Enter>zl"=c4l
	map <leader><leader> <Esc>/<++><Enter>zl"=c4l

For example, I have created the following mapping

	inoremap ,fr \frac{}{<++>}<++><Esc>Fcla

which can be used to quickly insert a fraction in the following way.

<figure class = "in_article">
    <hr class="midrule">
    <div>
        <div><img src="/assets/portfolio/2019-02-10-Vim-for-LaTeX/fractions_optimise.gif" alt="Fractions mapping example"></div>
    </div>
    <figcaption><code>,fr</code> mapping in action</figcaption>
    <hr class="midrule">
</figure>

This can also be used to quickly insert bold, emphatic or italic text.

	inoremap ,bf \textbf{}<++><Esc>T{i
	inoremap ,em \emph{}<++><Esc>T{i
	inoremap ,it \textit{}<++><Esc>T{i

#### Environments

When I first started using Vim for LaTeX, creating environments was a pain.
In previous editors, starting an environment would automatically create the appropriate closing command. Not so in Vim.
The solution was some more mappings, using placeholders where environments took optional arguments.

	inoremap ,t \begin{theorem}<Enter><Enter>\end{theorem}<Esc>ki
	inoremap ,T \begin{theorem}<Enter>[]<++><Enter>\end{theorem}<Esc>?\]<Enter>i
	inoremap ,p \begin{proof}<Enter><Enter>\end{proof}<Esc}ki

For the most part this worked but sometimes I wanted to insert an environment that I did not use sufficiently often to warrant its own mapping.
So I created the following mappings to create arbitrary environments, potentially with options, by typing their name followed by `,be` or `,BE`.

	inoremap ,be <Esc>^y$^i\begin{<Esc>$a}<Enter>;<Enter>\end{}<Esc>hp?\;<Enter>xi
	inoremap ,BE <Esc>^y$^i\begin{<Esc>$a}[]<Enter><++><Enter>\end{}<Esc>hp?\]<Enter>i

Note I am currently just yanking the environment name but I should probably yank it to a specific register to avoid conflicting with any text I am currently copying.

<figure class = "in_article">
    <hr class="midrule">
    <div>
        <div><img src="/assets/portfolio/2019-02-10-Vim-for-LaTeX/environments_optimise.gif" alt="Environments mapping example"></div>
    </div>
    <figcaption><code>,T</code> and <code>,be</code> mappings in action</figcaption>
    <hr class="midrule">
</figure>

<!-- Gif of environment entry -->

#### Visual mode mappings

When typing up notes I often find myself using the `\underbrace{}_{}` command to label terms in an equation.
I tend to write out the whole equation first, and then come back and label it up, so this was the perfect time to use a visual mode mapping.
For this I am using Tim Pope's [vim-surround](https://github.com/tpope/vim-surround) plugin.
I have create two mappings, one for annotating with text and one with more maths.

	vmap ,ut SBi\underbrace<Esc>l%a_{\text{}}<Esc>hi
	vmap ,um SBi\underbrace<Esc>l%a_{}<Esc>i

<figure class = "in_article">
    <hr class="midrule">
    <div>
        <div><img src="/assets/portfolio/2019-02-10-Vim-for-LaTeX/underbraces_optimise.gif" alt="Underbracing mapping example"></div>
    </div>
    <figcaption><code>,ut</code> mapping in action</figcaption>
    <hr class="midrule">
</figure>

### Next steps

The power of Vim is in its customisability so as I continue writing LaTeX documents I will keep an eye out for commonly typed phrases and create new mappings to speed up my workflow.
While I could use a pre-compiled snippet library, I find it better to create custom mappings that prioritise speeding up the code that I, myself, repeatedly write.

One minor annoyance with Vim is that I have to close my PDF viewer every time I exit Vim (although some may view this as a bonus).
This could be fixed by using Vim's `autocmd VimLeave` feature which can run arbitrary Vim commands before leaving the editor.
I may also get Vim to send a signal to my window manager to remove gaps between windows on entering a LaTeX file, to maximise screen real estate.

Having seen the power of text editing in Vim and starting to learn its language, I would like to use Vim to edit other code.
I am currently extending the code for my [Mandelbrot project](https://tomchaplin.github.io/portfolio/Exploring-the-Mandelbrot-Set/) which is written in `C++`.
In order to effectively use Vim as my editor for this, I will need a linting and auto-completion engines and preferably a debugger built into Vim.

### Useful resources
* [Luke Smith on Vim for LaTeX](https://www.youtube.com/watch?v=Mphdtdv2_xs&t=217s)
* [vimtex on GitHub](https://github.com/lervag/vimtex)
* [vim-tex-fold on Github](https://github.com/matze/vim-tex-fold)
