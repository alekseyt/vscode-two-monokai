import { CMYK } from "./cmyk.ts"
import { DEFAULTLIGHT } from "./defaultlight.ts"
import { LHD } from "./legithackdesign.ts"
import { MONOKAIDIMMED } from "./monokaidimmed.ts"
import { MONOKAIPRO } from "./monokaipro.ts"
import { ONEDARK } from "./onedark.ts"
import * as scopes from "./scopes.ts"

export interface ThemeSettingsI {
  name: string
  type: "dark" | "light"
}

interface TokenColorI {
  name: string
  scope: string[]
  settings: object
}

export function makeThemeObject(settings: ThemeSettingsI) {
  const semantics = validateSemantics(settings.type === "dark" ? SEMANTICS.dark : SEMANTICS.light)
  const tokenColors = makeTokenColors(semantics)
  const themeObj = settings.type === "dark" ? makeDark(tokenColors) : makeLight(tokenColors)
  const commonObj = makeCommon(settings)
  const finalObj = { ...commonObj, ...themeObj }

  return finalObj
}

const SEMANTICS = {
  dark: {
    unmarked: MONOKAIPRO.dark.white,
    keywords: MONOKAIPRO.dark.red,
    types: MONOKAIPRO.dark.cyan,
    constants: MONOKAIPRO.dark.magenta,
    strings: MONOKAIPRO.dark.yellow,
    functions: MONOKAIPRO.dark.green,
    arguments: MONOKAIPRO.dark.orange,
    members: ONEDARK.blue,
    comments: MONOKAIDIMMED.comments,
    link: ONEDARK.blue,

    markup: {
      list: MONOKAIPRO.dark.green,
      heading: MONOKAIPRO.dark.yellow, // Same as strings
      inline: MONOKAIPRO.dark.magenta, // Same as constants
      link: ONEDARK.blue, // Same as members
    },
  },

  light: {
    unmarked: CMYK.black,
    keywords: MONOKAIPRO.light.red,
    types: CMYK.cerulean,
    constants: DEFAULTLIGHT.magenta,
    strings: MONOKAIPRO.light.yellow,
    functions: MONOKAIPRO.light.green,
    arguments: MONOKAIPRO.dark.orange,
    members: LHD.light.membersblue,
    comments: CMYK.gray,
    link: CMYK.denimblue,

    markup: {
      list: MONOKAIPRO.light.green,
      heading: MONOKAIPRO.light.yellow,
      inline: DEFAULTLIGHT.magenta,
      link: CMYK.denimblue,
    },
  },
}

type SemanticsT = typeof SEMANTICS.dark

function validateSemantics(semantics: SemanticsT): SemanticsT {
  if (semantics.markup.heading !== semantics.strings) {
    throw new Error("semantics.markup.heading !== semantics.strings")
  }
  if (semantics.markup.inline !== semantics.constants) {
    throw new Error("semantics.markup.inline !== semantics.constants")
  }
  if (semantics.markup.link !== semantics.link) {
    throw new Error("semantics.markup.link !== semantics.members")
  }

  return semantics
}

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

function makeDark(tokenColors: TokenColorI[]) {
  return {
    colors: {
      "statusBar.background": "#333333", // match sidebar (activity bar)
      "statusBar.debuggingBackground": "#333333",
      "statusBar.noFolderBackground": "#333333",
      "statusBar.foreground": "#adadad", // match sidebar icons color
      "statusBarItem.remoteBackground": "#333333", // for WSL segment
      "statusBarItem.remoteForeground": "#adadad",
      "sideBarSectionHeader.background": "#333333", // match activity bar
      "tab.inactiveForeground": "#bbbbbb", // not too gray for better readability, default was #969696
      "titleBar.activeBackground": "#333333",
      "editor.foreground": MONOKAIPRO.dark.white,
      "editor.background": "#1e1e1e", // derived from Default Dark
      "editor.lineHighlightBackground": "#4444447f",
      "editorLineNumber.activeForeground": MONOKAIPRO.dark.cyan,
      "editorCursor.foreground": ONEDARK.blue,
      "editorGroupHeader.tabsBackground": "#282828", // massively derived from Monokai Dimmed
      "editorBracketMatch.border": "#cccccc", // brackets match color is actually coming from default text color in file explorer and it is pure gray
      "terminal.ansiWhite": "#ffffff", // don't remember why
    },
    tokenColors: tokenColors,
  }
}

function makeLight(tokenColors: TokenColorI[]) {
  return {
    colors: {
      "activityBar.background": "#d8d8d8", // tad darker than default section header (#dcdcdc)
      "activityBar.border": "#d8d8d8",
      "activityBar.activeBorder": "#d8d8d8",
      "activityBar.foreground": DEFAULTLIGHT.darkgray,
      "activityBar.inactiveForeground": DEFAULTLIGHT.gray,
      "sideBarSectionHeader.background": "#d8d8d8", // match activity bar
      "statusBar.background": "#d8d8d8", // match sidebar (activity bar)
      "statusBar.debuggingBackground": "#d8d8d8",
      "statusBar.noFolderBackground": "#d8d8d8",
      "statusBar.foreground": DEFAULTLIGHT.darkgray, // match sidebar icons color
      "statusBarItem.remoteBackground": "#d8d8d8", // for WSL segment
      "statusBarItem.remoteForeground": DEFAULTLIGHT.darkgray,
      "titleBar.activeBackground": "#d8d8d8", // match sidebar (activity bar)
      "editor.foreground": MONOKAIPRO.light.black,
      "editor.background": "#ffffff", // derived from default light
      "editor.lineHighlightBackground": "#4444440a",
      "editorLineNumber.foreground": CMYK.gray,
      "editorLineNumber.activeForeground": CMYK.denimblue,
      "editorBracketMatch.border": "#616161", // this matches default text color in file explorer
    },
    tokenColors: tokenColors,
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
    // {
    //   name: "Function arguments",
    //   scope: scopes.ARGUMENTS,
    //   settings: {
    //     foreground: semantics.arguments,
    //   },
    // },
    {
      name: "Number, Constant, Embedded",
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
        foreground: semantics.types,
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
      name: "URL",
      scope: scopes.URL,
      settings: {
        foreground: semantics.link,
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
      name: "Markup Bold",
      scope: scopes.MARKUP_BOLD,
      settings: {
        fontStyle: "bold",
      },
    },
    {
      name: "Markup Italic",
      scope: scopes.MARKUP_ITALIC,
      settings: {
        fontStyle: "italic",
      },
    },
    {
      name: "Markup Strikethrough",
      scope: scopes.MARKUP_STRIKETHROUGH,
      settings: {
        fontStyle: "strikethrough",
      },
    },
    {
      name: "Markup Headings", // not actually headings, just ## marks
      scope: scopes.MARKUP_HEADINGS,
      settings: {
        foreground: semantics.markup.list,
      },
    },
    {
      name: "Markup Heading Text",
      scope: scopes.MARKUP_HEADINGTEXT,
      settings: {
        foreground: semantics.markup.heading,
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
