import { POEMS_DATA, POETRY_THEMES, STAGE_CATEGORIES } from './poemsData'
import { EXTRA_POEMS_DATA } from './poemsExtra'
import { MORE_POEMS_DATA } from './poemsMore'
import { CURRICULUM_POEMS_DATA } from './poemsCurriculum'

export { POETRY_THEMES, STAGE_CATEGORIES }

export const ALL_POEMS = [
  ...POEMS_DATA,
  ...EXTRA_POEMS_DATA,
  ...MORE_POEMS_DATA,
  ...CURRICULUM_POEMS_DATA
]

export function getPoemById(id) {
  return ALL_POEMS.find(p => p.id === id) || ALL_POEMS[0]
}

export function getThemeMeta(themeKey) {
  return POETRY_THEMES[themeKey] || POETRY_THEMES.landscape
}
