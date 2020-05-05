const entityMap = {
  unescape: {
    '&amp;': "&",
    '&apos;': "'",
    '&gt;': ">",
    '&lt;': "<",
    '&quot;': '"',
    '&nbsp;': ' ',

  }
};
const entityReg = {
  unescape: RegExp('(' + Object.keys(entityMap.unescape).join('|') + ')', 'g')
}

export function unescape(str) {
  if (typeof str !== 'string') return ''
  return str.replace(entityReg.unescape, function(match) {
    return entityMap.unescape[match]
  })
}