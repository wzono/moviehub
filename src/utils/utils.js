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

export function unescapeEntity(str) {
  if (typeof str !== 'string') return ''
  return uncodeUtf16(str.replace(entityReg.unescape, function(match) {
    return entityMap.unescape[match]
  }))
}

function uncodeUtf16(str){
  const reg = /\&#.*?;/g;
  return str.replace(reg, function (char) {
    let H, L, code;
    if (char.length === 9) {
      code = parseInt(char.match(/[0-9]+/g));
      H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
      L = (code - 0x10000) % 0x400 + 0xDC00;
      return unescape("%u" + H.toString(16) + "%u" + L.toString(16));
    } else {
      return char;
    }
  });
}