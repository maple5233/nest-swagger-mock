export const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export const getWordsRegex = (min: number, max: number) =>
  new RegExp(`^([\\w\\\\\\/]+\\s?){${min},${max}}$`)

export const getWordsWithChineseRegex = (min: number, max: number) =>
  new RegExp(`^([\\w\\\\\\/\\u4e00-\\u9fa5]+\\s?){${min},${max}}$`)

export const isChineseWord = (word: string) => /^[\u4e00-\u9fa5]+$/.test(word)
