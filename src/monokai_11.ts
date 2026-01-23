import * as scopes from "./scopes.ts"

export interface ThemeSettingsI {
  name: string
  type: "dark" | "light"
}

export function makeThemeObject(settings: ThemeSettingsI) {
  console.assert(settings.type === "dark", "Light theme is not supported (yet)")

  const commonObj = makeCommon(settings)
  const themeObj = makeDark(semantics.dark)
  const finalObj = { ...commonObj, ...themeObj }

  return finalObj
}

const monokaipro = {
  dark: {
    white: "#fcfcfa",
    red: "#ff6188",
    orange: "#fc9867",
    yellow: "#ffd866",
    green: "#a9dc76",
    cyan: "#78dce8",
    magenta: "#ab9df2",
  },
  light: {
    black: "#1c1514",
    red: "#e14775",
    orange: "#e16032",
    yellow: "#cc7a0a",
    green: "#269d69",
    cyan: "#1c8ca8",
    magenta: "#7058be",
  },
}

const onedark = {
  blue: "#61afef",
}

const monokaidimmed = {
  comments: "#9a9b99",
}

const semantics = {
  dark: {
    unmarked: monokaipro.dark.white,
    keywords: monokaipro.dark.red,
    types: monokaipro.dark.cyan,
    constants: monokaipro.dark.magenta,
    strings: monokaipro.dark.yellow,
    functions: monokaipro.dark.green,
    arguments: monokaipro.dark.orange,
    members: onedark.blue,
    comments: monokaidimmed.comments,

    markup: {
      list: monokaipro.dark.green,
      styling: monokaipro.dark.red,
      heading: monokaipro.dark.red,
      headingText: monokaipro.dark.yellow,
      inline: monokaipro.dark.cyan,
      link: onedark.blue,
    },
  },
  light: {
    unmarked: monokaipro.light.black,
    keywords: monokaipro.light.red,
    types: monokaipro.light.cyan,
    constants: monokaipro.light.magenta,
    strings: monokaipro.light.yellow,
    functions: monokaipro.light.green,
    arguments: monokaipro.light.orange,
    // members: // TODO
    // comments: // TODO
  },
}

type SemanticsT = typeof semantics.dark

// https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide#semantic-coloring-in-color-themes

function makeCommon(settings: ThemeSettingsI) {
  return {
    name: settings.name,
    type: settings.type,
    semanticHighlighting: true,
  }
}

// https://code.visualstudio.com/api/references/theme-color
// https://code.visualstudio.com/docs/getstarted/themes
// https://code.visualstudio.com/api/extension-guides/color-theme
// https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide

function makeDark(semantics: SemanticsT) {
  return {
    colors: {
      "editor.lineHighlightBackground": "#4444447f",
      "editorLineNumber.activeForeground": monokaipro.dark.cyan,
      "editorCursor.foreground": onedark.blue,
      "statusBar.background": "#333333", // match sidebar
      "statusBar.debuggingBackground": "#333333",
      "statusBar.noFolderBackground": "#333333",
      "statusBar.foreground": "#adadad", // match sidebar icons color
      "statusBarItem.remoteBackground": "#333333", // for WSL segment
      "statusBarItem.remoteForeground": "#adadad",
      "tab.inactiveForeground": "#bbbbbb", // not too gray for better readability, default was #969696
      "titleBar.activeBackground": "#333333",
      // derived from Monokai
      // this is actually from Monokai, not from Default Dark or Monokai Dimmed
      // not sure about "fa" part, looks inconsistent, but this is what was picked from screenshot
      "editor.foreground": monokaipro.dark.white,
      // derived from Default Dark
      "editor.background": "#1e1e1e",
      // massively derived from Monokai Dimmed
      "editorGroupHeader.tabsBackground": "#282828",
      "terminal.ansiWhite": "#ffffff",
      // brackets match color is actually coming from default text color in file explorer and it is pure gray
      "editorBracketMatch.border": "#cccccc",
    },
    tokenColors: makeTokenColors(semantics),
  }
}

function makeLight(semantics: SemanticsT) {
  return {
    colors: {},
    tokenColors: makeTokenColors(semantics),
  }
}

function makeTokenColors(semantics: SemanticsT) {
  return [
    {
      // also place for disabling unwanted highlighting
      name: "Invalid",
      scope: scopes.INVALID,
      settings: {
        foreground: semantics.unmarked,
      },
    },
    {
      name: "Keywords",
      scope: scopes.KEYWORDS,
      settings: {
        foreground: semantics.keywords,
      },
    },
    {
      name: "Types",
      scope: scopes.TYPES,
      settings: {
        foreground: semantics.types,
      },
    },
    {
      name: "Member access",
      scope: scopes.MEMBERS,
      settings: {
        // has to be different from "storage" otherwise "const x = 10;" won't look nice in JS/TS
        // this color is also used in C's "x->y", for coloring "y"
        foreground: semantics.members,
      },
    },
    {
      name: "Comments",
      scope: scopes.COMMENTS,
      settings: {
        foreground: semantics.comments,
      },
    },
    {
      name: "Functions, Methods",
      scope: scopes.FUNCTIONS,
      settings: {
        foreground: semantics.functions,
      },
    },
    {
      name: "Function arguments",
      scope: scopes.ARGUMENTS,
      settings: {
        foreground: semantics.arguments,
      },
    },
    {
      name: "Number, Constant, Tag Attribute, Embedded",
      scope: scopes.CONSTANTS,
      settings: {
        foreground: semantics.constants,
      },
    },
    {
      name: "String, Symbols, Markup Heading",
      scope: scopes.STRINGS,
      settings: {
        foreground: semantics.strings,
      },
    },
    {
      name: "Tag",
      scope: scopes.TAGS,
      settings: {
        foreground: semantics.keywords,
      },
    },
    {
      name: "Sub-methods",
      scope: scopes.SUBMETHODS,
      settings: {
        foreground: semantics.keywords,
      },
    },
    {
      name: "Language methods",
      scope: scopes.LANGMETHODS,
      settings: {
        foreground: semantics.keywords,
      },
    },
    {
      name: "Attributes", // tag attributes (per Solarized Dark)
      scope: scopes.ATTRIBUTES,
      settings: {
        foreground: semantics.constants,
      },
    },
    {
      name: "Regular Expressions",
      scope: ["string.regexp"],
      settings: {
        foreground: semantics.constants,
      },
    },
    {
      name: "Escape Characters",
      scope: ["constant.character.escape"],
      settings: {
        foreground: semantics.types,
      },
    },
    {
      name: "Decorators",
      scope: scopes.DECORATORS,
      settings: {
        foreground: semantics.types,
      },
    },
    {
      name: "ES7 Bind Operator",
      scope: scopes.ES7BINDOP,
      settings: {
        foreground: semantics.keywords,
      },
    },
    {
      name: "URL",
      scope: scopes.URL,
      settings: {
        fontStyle: "underline",
      },
    },
    // markdown stuff is coming mostly from Solarized Dark
    // (except actual colors)
    {
      name: "Markup Quote, Lists",
      scope: scopes.MARKUP_LIST,
      settings: {
        foreground: semantics.markup.list,
      },
    },
    {
      name: "Markup Styling",
      scope: scopes.MARKUP_STYLING,
      settings: {
        foreground: semantics.markup.styling,
      },
    },
    {
      name: "Markup Headings", // not actually headings, just ## marks
      scope: scopes.MARKUP_HEADINGS,
      settings: {
        foreground: semantics.markup.heading,
      },
    },
    {
      name: "Markup Heading Text",
      scope: scopes.MARKUP_HEADINGTEXT,
      settings: {
        foreground: semantics.markup.headingText,
      },
    },
    {
      name: "Markup Inline",
      scope: scopes.MARKUP_INLINE,
      settings: {
        foreground: semantics.markup.inline,
      },
    },
    {
      name: "Markdown - Link",
      scope: scopes.MARKUP_LINK,
      settings: {
        // maybe it's a good idea to have this same color as String Link
        foreground: semantics.markup.link,
      },
    },
  ]
}
