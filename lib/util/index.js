module.exports.handleParam = obj => {
  if (typeof obj === 'object') {
    if (Object.keys(obj).length > 0) {
      return true
    } else {
      return false
    }
  } else {
    return (!!obj)
  }
}

module.exports.toArray = arr => Array.isArray(arr) ? arr : [arr]
