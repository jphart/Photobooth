function connectEffect(seriously, src, target, effect) {
  effect.source = src
  target.source = effect
  seriously.go()
}

const effects = {
  vanilla: (seriously, src, target) => {
    target.source = src
    seriously.go()
  },
  ascii: (seriously, src, target) => {
    const ascii = seriously.effect('ascii')
    connectEffect(seriously, src, target, ascii)
  },
  daltonize: (seriously, src, target) => {
    const daltonize = seriously.effect('daltonize')
    daltonize.type = '0.8'
    connectEffect(seriously, src, target, daltonize)
  },
  hex: (seriously, src, target) => {
    const hex = seriously.effect('hex')
    hex.size = 0.03
    connectEffect(seriously, src, target, hex)
  },
  nightvision: (seriously, src, target) => {
    const nightvision = seriously.effect('nightvision')

    connectEffect(seriously, src, target, nightvision)
  },
  vignette: (seriously, src, target) => {
    const vignette = seriously.effect('vignette')
    vignette.amount = 2
    connectEffect(seriously, src, target, vignette)
  },
  filmgrain: (seriously, src, target) => {
    const filmgrain = seriously.effect('filmgrain')
    filmgrain.amount = 0.1
    connectEffect(seriously, src, target, filmgrain)
  },
  sketch: (seriously, src, target) => {
    const sketch = seriously.effect('sketch')
    connectEffect(seriously, src, target, sketch)
  },
  kaleidoscope: (seriously, src, target) => {
    const kaleidoscope = seriously.effect('kaleidoscope')
    connectEffect(seriously, src, target, kaleidoscope)
  },
  mirror: (seriously, src, target) => {
    const mirror = seriously.effect('mirror')
    connectEffect(seriously, src, target, mirror)
  },
  pixelate: (seriously, src, target) => {
    const pixelate = seriously.effect('pixelate')
    connectEffect(seriously, src, target, pixelate)
  },
  ripple: (seriously, src, target) => {
    const ripple = seriously.effect('ripple')
    ripple.distortion = 2
    connectEffect(seriously, src, target, ripple)
  },
  scanlines: (seriously, src, target) => {
    const scanlines = seriously.effect('scanlines')
    connectEffect(seriously, src, target, scanlines)
  },
  vibrance: (seriously, src, target) => {
    const vibrance = seriously.effect('vibrance')
    vibrance.amount = 10
    connectEffect(seriously, src, target, vibrance)
  }
}
const effectNames = Object.keys(effects)
let currentIndex = 0

function setNextIndex() {
  const nextIndex = currentIndex + 1 < effectNames.length ? currentIndex + 1 : 0
  currentIndex = nextIndex
  return currentIndex
}

function setIndexToEffectIndex(effectName) {
  currentIndex = effectNames.indexOf(effectName)
  return currentIndex
}

exports.choose = (seriously, src, target, effectName = 'vanilla') => {
  effects[effectName](seriously, src, target)
  setIndexToEffectIndex(effectName)
}

exports.cycle = (seriously, src, target) => {
  setNextIndex()
  effects[effectNames[currentIndex]](seriously, src, target)
}
