var fs = require('fs');
var fetch = require('node-fetch');

var path = `./training-samples`
var apiKey = process.argv[2];

console.log(`Loading samples from '${path}' and sending to snowboy training service using API key: ${apiKey}`)
 
fs.readdir(path, function(err, items) {

    var base64s = items.map(item => base64_encode(`${path}/${item}`));
    send(base64s);

});
 
function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

function base64_decode(base64str, file) {
    var bitmap = new Buffer(base64str, 'base64');
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}

async function send(samples)
{
    var packet = {
        "name": "mirror",
        "language": "en",
        "age_group": "30_39",
        "gender": "M",
        "microphone": "cheap and nasty",
        "token": apiKey,
        "voice_samples": samples.map(w => ({ wave: w }))
    };

    var logPacket = {
        ...packet,
        "voice_samples": packet.voice_samples.map(w => ({ wave: w.wave.substr(0,10) + "..." }))
    }

    console.log("Sending to snowboy API..", logPacket);

    var result = await fetch("https://snowboy.kitt.ai/api/v1/train/", {
        method: "POST",
        body: JSON.stringify(packet),
        headers: {
            "Content-Type": "application/json"
        }
    });

    console.log("Snowboy API returned:", result)

    if (result.status != 201)
        throw new Error(await result.text())
    
    var bytes = await result.blob();
    fs.writeFileSync(`./resources/generated.pmdl`, bytes);
}


