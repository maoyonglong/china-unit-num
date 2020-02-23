(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['china-unit-num'], factory)
  } else if (typeof exports === 'object') {
    module.exports = factory
  } else {
    if (window) {
      window.chinaUnitNum = factory
    }
  }
})(function () {
  function getFigures (num) {
    var figures = []
  
    do {
      figures.push(num % 10)
      num = parseInt(num / 10)
    } while (num !== 0)
  
    return figures.reverse()
  }
  
  function applyOptions (options) {
    var defaultOptions = {
      decimal: 2,
      ignore: []
    }
  
    if (options) {
      Object.assign(defaultOptions, options)
    }
  
    return defaultOptions
  }
  
  var BAI = 3
  var QIAN = 4
  var WAN = 5
  var BAI_WAN = 7
  var QIAN_WAN = 8
  var YI = 9
  
  var unitFigures = [BAI, QIAN, WAN, BAI_WAN, QIAN_WAN, YI]
  var units = ['百', '千', '万', '百万', '千万', '亿']
  
  function filterFigure (ignore) {
    ignore.forEach(function (item) {
      if (typeof item === 'string') {
        for (var i = 0, len = units.length; i < len; i++) {
          if (units[i] === item) {
            item = i
            break
          }
        }
      }
      if (typeof item !== 'number') return
      unitFigures.splice(item, 1)
      units.splice(item, 1)
    })
  }
  
  function chinaUnitNum (num, options) {
    options = applyOptions(options)
    var figures = getFigures(num)
    var length = figures.length
    var i, len, unit, unitFigure
    var decimalFigureNum = options.decimal
    filterFigure(options.ignore)
    for (i = 0, len = unitFigures.length; i < len; i++) {
      if (unitFigures[i] > length) {
        unitFigure = unitFigures[i - 1]
        unit = units[i - 1]
        break
      } else if (unitFigures[i] === length) {
        unitFigure = unitFigures[i]
        unit = units[i]
        break
      }
    }
    // >= 亿
    if (i === len) {
      unitFigure = unitFigures[i - 1]
      unit = units[i - 1]
    }
    // 无单位( < 百 )
    if (i === 0 && typeof unitFigure === 'undefined') {
      unit = 0
    } else {
      unitIdx = length - unitFigure + 1
      figures =
      figures
        .slice(0, unitIdx)
        .concat(
          ['.'],
          figures.slice(
            unitIdx,
            unitIdx + decimalFigureNum >= len ? undefined : unitIdx + decimalFigureNum
          )
        )
    }
  
    return parseFloat(figures.join('')) + unit
  }

  return chinaUnitNum
})
