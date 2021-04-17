# Visual Studio Code LilyPond Syntax

[![Visual Studio Marketplace](https://vsmarketplacebadge.apphb.com/version/jeandeaual.lilypond-syntax.svg)](https://marketplace.visualstudio.com/items?itemName=jeandeaual.lilypond-syntax)
[![build](https://github.com/jeandeaual/vscode-lilypond-syntax/workflows/build/badge.svg)](https://github.com/jeandeaual/vscode-lilypond-syntax/actions?query=workflow%3Abuild)

LilyPond syntax highlighting for Visual Studio Code.

## Features

* LilyPond syntax highlighting
    * Including new syntax introduced in [LilyPond 2.20](https://lilypond.org/doc/v2.20/Documentation/changes-big-page.html)
    * Also works in [Markdown code blocks](https://docs.github.com/en/github/writing-on-github/creating-and-highlighting-code-blocks#syntax-highlighting)
* [Scheme](https://lilypond.org/doc/stable/Documentation/extending/scheme-tutorial) syntax highlighting

## Screenshots

### Standard LilyPond notation

![Real music example](https://github.com/jeandeaual/vscode-lilypond-syntax/blob/master/assets/real-music-example.png?raw=true)

### LilyPond Scheme

![LilyPond Scheme](https://github.com/jeandeaual/vscode-lilypond-syntax/blob/master/assets/lilypond-scheme.png?raw=true)

### Markdown code blocks

![Markdown code blocks](https://github.com/jeandeaual/vscode-lilypond-syntax/blob/master/assets/markdown-code-blocks.png?raw=true)

## Requirements

* [Visual Studio Code](https://code.visualstudio.com/) 1.0.0 or newer

## Installation

* [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=jeandeaual.lilypond-syntax)
* [Open VSX Registry](https://open-vsx.org/extension/jeandeaual/lilypond-syntax)

## Build

```sh
yarn install
npx vsce package
```

## Release Notes

See [here](CHANGELOG.md).

## Acknowledgements

Based on [TrudyFirestone/VSLilyPond](https://github.com/TrudyFirestone/VSLilyPond).

Grammar from [SubLilyPond](https://github.com/yrammos/SubLilyPond) by Yannis Rammos, copyright © 2013 under the Creative Commons Attribution-NonCommercial 3.0 Unported (CC BY-NC 3.0) license, <http://creativecommons.org/licenses/by-sa/3.0/>.
See that repository for additional acknowledgements.
