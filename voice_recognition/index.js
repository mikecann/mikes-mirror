'use strict'

const ROOT_DIR = __dirname + '/./'
const SonusC = require(ROOT_DIR + 'sonus.js')
const speech = require('@google-cloud/speech')({
  projectId: 'streaming-speech-sample',
  keyFilename: ROOT_DIR + 'keyfile.json'
})

const hotwords = [{ file: ROOT_DIR + 'resources/smart_mirror.pmdl', hotword: 'smart mirror' }]
const language = "en-US"

//recordProgram can also be 'arecord' which works much better on the Pi and low power devices
const sonus = SonusC.init({ hotwords, language, recordProgram: "arecord" }, speech)

SonusC.start(sonus)
console.log(JSON.stringify({ event: "ready", hotword: hotwords[0].hotword }))

sonus.on('hotword', (index, keyword) => console.log(JSON.stringify({ event: "hotword-detected" })))

sonus.on('partial-result', result => console.log(JSON.stringify({ event: "partial", result })))

var hasSound = false;

sonus.on('sound', result => {

  if (hasSound)
    return;

  hasSound = true;

  console.log(JSON.stringify({ event: "sound" }));
})

sonus.on('silence', result => {

  if (!hasSound)
    return;
  
  hasSound = false;

  console.log(JSON.stringify({ event: "silence" }));
})

sonus.on('error', error => console.log(JSON.stringify({ event: "error", error })))

sonus.on('final-result', result => {
  console.log(JSON.stringify({ event: "final", result }))
  if (result.includes("stop")) {
    SonusC.stop()
  }
})
