WIP

Clean, clear, dark, color-coded theme without bullshit:

- No italic or bold (except markup files)
- No underlining (except links)
- Good contrast
- ~~Bugs fixed, PRs merged, etc~~

Light theme was also added to complement dark theme on bright days.

Theme focuses mostly (but not entirely) on editor colors, the rest are defaults
(default dark or something). Inspired by [One Monokai][] theme, but instead
of blending One Dark and Monokai, it blends Default Dark, Monokai Dimmed
and Monokai (and a little bit of One Dark, it's complicated).

[One Monokai]: https://github.com/azemoh/vscode-one-monokai

Editor colors derived from [Monokai Pro][]:

- White: <span style="color:#fcfcfa">#fcfcfa</span>
- Red: <span style="color:#ff6188">#ff6188</span>
- Orange: <span style="color:#fc9867">#fc9867</span>
- Yellow: <span style="color:#ffd866">#ffd866</span>
- Green: <span style="color:#a9dc76">#a9dc76</span>
- Cyan: <span style="color:#78dce8">#78dce8</span>
- Magenta: <span style="color:#ab9df2">#ab9df2</span>

[Monokai Pro]: https://monokai.pro

Derived from [One Dark][]:

- Blue: <span style="color:#61afef">#61afef</span>

[One Dark]: https://binaryify.github.io/OneDark-Pro/

Derived from Monokai Dimmed:

- Comments color: <span style="color:#9a9b99">#9a9b99</span>
- Some other UI colors too (status bar, etc)

Derived from [Default Light][] (light theme):

- Magenta: <span style="color:#ab9df2">#af00db</span>

[Default Light]: https://github.com/microsoft/vscode/blob/main/extensions/theme-defaults/themes/light_plus.json

Derived from Monokai Pro (light):

- Black: <span style="color:#1c1514">#1c1514</span>
- Red: <span style="color:#e14775">#e14775</span>
- Orange: <span style="color:#e16032">#e16032</span>
- Yellow: <span style="color:#cc7a0a">#cc7a0a</span>
- Green: <span style="color:#269d69">#269d69</span>
- Cyan: <span style="color:#1c8ca8">#1c8ca8</span>
- Magenta: <span style="color:#7058be">#7058be</span>

There are also some CMYK colors were used (light themes are hard).

- CMYK [color codes](https://www.toutes-les-couleurs.com/en/CMYK-color-code.php)
- CMYK to RGB [converter](https://www.rapidtables.com/convert/color/cmyk-to-rgb.html)

Tested on C++, Lua, Typescript. Markdown will also get some love
(not too much). Shell seems to work fine too, as well as GLSL, but
don't quote me on that.

Other languages might also work, i don't know. Theme isn't tailored for
any particular language specifically, but it has quirks for C++ and
Lua here and there.

P.S.

[Two Monokai][] was taken, so it was renamed to Eleven Monokai to leave
a room for Three Monokai, Four Monokai and so on.

[Two Monokai]: https://marketplace.visualstudio.com/items?itemName=khan.two-monokai
