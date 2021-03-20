# VSCode LilyPond Syntax

[![build](https://github.com/jeandeaual/vscode-lilypond-syntax/workflows/build/badge.svg)](https://github.com/jeandeaual/vscode-lilypond-syntax/actions?query=workflow%3Abuild)

LilyPond syntax highlighting for VSCode.

## Features

* LilyPond syntax highlighting
    * Including new syntax introduced in [LilyPond 2.20](https://lilypond.org/doc/v2.20/Documentation/changes-big-page.html)
    * Also works in [Markdown code blocks](https://docs.github.com/en/github/writing-on-github/creating-and-highlighting-code-blocks#syntax-highlighting)
* [Scheme](https://lilypond.org/doc/stable/Documentation/extending/scheme-tutorial) syntax highlighting

## Requirements

* [VSCode](https://code.visualstudio.com/) 1.0.0 or newer

## Installation

1. Open the Extensions left panel in VSCode (Windows: Ctrl+Shift+X; MacOS: Cmd+Shift+X)
2. Type in `LilyPond Syntax` in the search bar
3. Install the extension, then reload VSCode (Ctrl+R)

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
