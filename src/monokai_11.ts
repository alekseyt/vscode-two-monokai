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
  }
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
  }
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
    tokenColors: [
      {
        // also place for disabling unwanted highlighting
        name: "Invalid",
        scope: [
          "invalid",
          "invalid.illegal",
          "variable", // anything before dot is variable (variable.object) apparently, idk, looks really out of place when highlighted
          "variable.parameter", // doesn't look good in C++ with & or *, also not really helping
          // "entity.name.type.cpp", // revert to 1.33.1 // this disables highlighting of return types
        ],
        settings: {
          foreground: semantics.unmarked,
        },
      },
      {
        name: "Keywords",
        scope: [
          "keyword",
          "constant.other.color",
          "storage.modifier", // this is strange one, "override" in C++ is storage modifier
          "storage.type.modifier", // another stange one, public/protected/private + final apparently
          "storage.type.struct", // storage.type goes to types, but class and struct are keywords
          // bleh
          "storage.type.class", // mostly for C++: class, struct, also used in JS ("const")
          "storage.type.enum", // enum, enum class
          "storage.type.namespace", // don't ask me
          "storage.type.template", // sigh, "template <typename T> ..."
          // typescript
          "storage.type.function.arrow.ts", // "=>"
          "storage.type.property.ts", // "get"
          "storage.type.interface.ts", // "interface"
          "storage.type.type.ts", // "type"
          "storage.type.function.ts", // "function"
        ],
        settings: {
          foreground: semantics.keywords,
        },
      },
      {
        name: "Types",
        scope: [
          "entity.name", // usually argument type, class name or whatever after :: (idk why)
          "entity.other.inherited-class", // typescript base class (implemented interface)
          "storage.type", // int, float, bool
          "support.type",
          "support.class",
        ],
        settings: {
          foreground: semantics.types,
        },
      },
      {
        name: "Member access, Other Variable, String Link",
        scope: [
          "variable.other.property", // member access, last object in chain x->y->z
          "variable.object.property", // member declaration: private x: number
          "variable.other.member", // also member access, e.g. "rbg" part in "color.rgb"
          "variable.other.object.property", // also member access, middle object in chain x->y->z
          "string.other.link", // detected links will be this color too
          "variable.other.lua", // obj.x in Lua ("x" part)
          "support.variable.glsl", // well-known variables: gl_FragColor, gl_FragData
        ],
        settings: {
          // has to be different from "storage" otherwise "const x = 10;" won't look nice in JS/TS
          // this color is also used in C's "x->y", for coloring "y"
          foreground: semantics.members,
        },
      },
      {
        name: "Comments",
        scope: ["comment", "punctuation.definition.comment"],
        settings: {
          foreground: semantics.comments,
        },
      },
      {
        name: "Function, Special Method",
        scope: [
          "entity.name.function",
          // somehow this assigns color to constants in arguments list
          // e.g. "ns::call(smtg::CONSTANT);" <- "smtg::CONSTANT" will be colored
          "variable.function",
          "support.function",
          "keyword.other.special-method",
          // XXX: it would be good to have namespace color same as function color
          // so then a call like glm::normalize() is made it's colored uniformly
          // but as a side effect, std in std::string is colored too
          "entity.name.scope-resolution",
          "entity.name.namespace", // name in namespace declaration as in "namespace ns {}" ("ns" part)
        ],
        settings: {
          foreground: semantics.functions,
        },
      },
      {
        name: "Function arguments",
        scope: [
          "variable.parameter",
        ],
        settings: {
          foreground: semantics.arguments,
        }
      },
      {
        name: "Number, Constant, Tag Attribute, Embedded",
        scope: [
          "constant.numeric",
          "support.constant",
          // built-in constant (per Solarized Dark)
          "constant.language",
          // user-defined constants (per Solarized Dark)
          "constant.character",
          "constant.escape",
          "keyword.other.unit", // "f" in "12.5f"
          "support.contant.glsl", // well-known constants
          "string constant.other.placeholder", // "%s" in printf etc
        ],
        settings: {
          foreground: semantics.constants,
        },
      },
      {
        name: "String, Symbols, Markup Heading",
        scope: [
          "string",
          "constant.other.symbol",
          "constant.other.key",
          "markup.heading",
          "markup.inserted.git_gutter",
          "meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js",
        ],
        settings: {
          foreground: semantics.strings,
        },
      },
      {
        name: "Tag",
        scope: ["entity.name.tag", "meta.tag.sgml", "markup.deleted.git_gutter"],
        settings: {
          foreground: semantics.keywords,
        },
      },
      {
        name: "Sub-methods",
        scope: ["entity.name.module.js", "variable.import.parameter.js", "variable.other.class.js"],
        settings: {
          foreground: semantics.keywords,
        },
      },
      {
        name: "Language methods",
        scope: ["variable.language"],
        settings: {
          foreground: semantics.keywords,
        },
      },
      {
        name: "Attributes", // tag attributes (per Solarized Dark)
        scope: ["entity.other.attribute-name"],
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
        scope: ["tag.decorator.js entity.name.tag.js", "tag.decorator.js punctuation.definition.tag.js"],
        settings: {
          foreground: semantics.types,
        },
      },
      {
        name: "ES7 Bind Operator",
        scope: ["source.js constant.other.object.key.js string.unquoted.label.js"],
        settings: {
          foreground: semantics.keywords,
        },
      },
      {
        name: "URL",
        scope: ["*url*", "*link*", "*uri*"],
        settings: {
          fontStyle: "underline",
        },
      },
      // markdown stuff is coming mostly from Solarized Dark
      // (except actual colors)
      {
        name: "Markup Quote, Lists",
        scope: ["markup.quote", "markup.list", "markup.other"],
        settings: {
          foreground: semantics.markup.list,
        },
      },
      {
        name: "Markup Styling",
        scope: ["markup.bold", "markup.italic"],
        settings: {
          foreground: semantics.markup.styling,
        },
      },
      {
        name: "Markup Headings", // not actually headings, just ## marks
        scope: [
          "markup.heading",
          "markup.heading.setext",
          "constant.other.reference.link.markdown", // link anchor
        ],
        settings: {
          foreground: semantics.markup.heading,
        },
      },
      {
        name: "Markup Heading Text",
        scope: ["markup.heading entity.name"],
        settings: {
          foreground: semantics.markup.headingText,
        },
      },
      {
        name: "Markup Inline",
        scope: ["markup.inline.raw", "markup.raw"],
        settings: {
          foreground: semantics.markup.inline,
        },
      },
      {
        name: "Markdown - Link",
        scope: ["markup.underline.link.markdown"],
        settings: {
          // maybe it's a good idea to have this same color as String Link
          foreground: semantics.markup.link,
        },
      },
    ],
  }
}
