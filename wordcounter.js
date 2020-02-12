const fs = require('fs')
const file = process.argv[2]
const allowedSigns = getAllowedSigns()
const text = getText(file)
const words = getWordsFromText(text)
console.log(words)

function getAllowedSigns() {
  try {
    const buffer = fs.readFileSync('config.json')
    const json = JSON.parse(buffer)
    const string = json.allowedSigns
    return string.split('')
  } catch (err) {
    console.log(err)
    return -1
  }
}

function getText(file) {
  try {
    const data = fs.readFileSync(file)
    return data.toString()
  } catch (err) {
    console.log(err)
    return ''
  }
}

function getWordsFromText(textString) {
  if (!textString) return ['']
  const chunks = textString.split(' ')
  const words = chunks.map(chunk => {
    const chars = chunk.split('')
    return chars.reduce(delCorruptSigns, '')
  })
  return words
}

function delCorruptSigns(acc, cur) {
  cur = allowedSigns.indexOf(cur) !== -1 ? cur : ''
  return acc + cur
}
