export const INVALID = [
  "invalid",
  "invalid.illegal",
  "variable", // anything before dot is variable (variable.object) apparently, idk, looks really out of place when highlighted
  "variable.parameter", // doesn't look good in C++ with & or *, also not really helping
  // "entity.name.type.cpp", // revert to 1.33.1 // this disables highlighting of return types
]

export const KEYWORDS = [
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
]

export const TYPES = [
  "entity.name", // usually argument type, class name or whatever after :: (idk why)
  "entity.other.inherited-class", // typescript base class (implemented interface)
  "storage.type", // int, float, bool
  "support.type",
  "support.class",
]

export const MEMBERS = [
  "variable.other.property", // member access, last object in chain x->y->z
  "variable.object.property", // member declaration: private x: number
  "variable.other.member", // also member access, e.g. "rbg" part in "color.rgb"
  "variable.other.object.property", // also member access, middle object in chain x->y->z
  "string.other.link", // detected links will be this color too
  "variable.other.lua", // obj.x in Lua ("x" part)
  "support.variable.glsl", // well-known variables: gl_FragColor, gl_FragData
]

export const COMMENTS = ["comment", "punctuation.definition.comment"]

export const FUNCTIONS = [
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
]

export const ARGUMENTS = ["variable.parameter"]

export const CONSTANTS = [
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
]

export const STRINGS = [
  "string",
  "constant.other.symbol",
  "constant.other.key",
  "markup.heading",
  "markup.inserted.git_gutter",
  "meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js",
]

export const TAGS = ["entity.name.tag", "meta.tag.sgml", "markup.deleted.git_gutter"]

export const SUBMETHODS = ["entity.name.module.js", "variable.import.parameter.js", "variable.other.class.js"]

export const LANGMETHODS = ["variable.language"]

export const ATTRIBUTES = ["entity.other.attribute-name"]

export const DECORATORS = ["tag.decorator.js entity.name.tag.js", "tag.decorator.js punctuation.definition.tag.js"]

export const ES7BINDOP = ["source.js constant.other.object.key.js string.unquoted.label.js"]

export const URL = ["*url*", "*link*", "*uri*"]

export const MARKUP_LIST = ["markup.quote", "markup.list", "markup.other"]

export const MARKUP_STYLING = ["markup.bold", "markup.italic"]

export const MARKUP_HEADINGS = [
  "markup.heading",
  "markup.heading.setext",
  "constant.other.reference.link.markdown", // link anchor
]

export const MARKUP_HEADINGTEXT = ["markup.heading entity.name"]

export const MARKUP_INLINE = ["markup.inline.raw", "markup.raw"]

export const MARKUP_LINK = ["markup.underline.link.markdown"]
