import * as fs from "fs/promises"
import * as path from "path"
import { makeThemeObject, type ThemeSettingsI } from "./monokai_11.ts"

interface ThemeDescriptionI extends ThemeSettingsI {
  file: string
}

const THEMES_DIRECTORY = "./themes"
const THEMES: ThemeDescriptionI[] = [
  {
    name: "Eleven Monokai",
    type: "dark",
    file: path.join(THEMES_DIRECTORY, "Two Monokai (Dark).json"),
  },
]

await fs.mkdir(THEMES_DIRECTORY, {
  recursive: true,
})

for (const theme of THEMES) {
  const themeObj = makeThemeObject(theme)
  await fs.writeFile(theme.file, [JSON.stringify(themeObj, null, 2), "\n"])
}
