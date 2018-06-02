import * as shelljs from "shelljs";

export class TextToSpeechService {

    init() {
        // // Creates a client
        // const client = new textToSpeech.TextToSpeechClient();

        // // The text to synthesize
        // const text = 'Hello, world!';

        // // Construct the request
        // const request = {
        //     input: { text: text },
        //     // Select the language and SSML Voice Gender (optional)
        //     voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
        //     // Select the type of audio encoding
        //     audioConfig: { audioEncoding: 'MP3' },
        // };

        // // Performs the Text-to-Speech request
        // client.synthesizeSpeech(request, (err: any, response: any) => {
        //     if (err) {
        //         console.error('ERROR:', err);
        //         return;
        //     }

        //     console.log("GOT RESULT", response.audioContent);

        //     // Write the binary audio content to a local file
        //     // fs.writeFile('output.mp3', response.audioContent, 'binary', err => {
        //     //     if (err) {
        //     //         console.error('ERROR:', err);
        //     //         return;
        //     //     }
        //     //     console.log('Audio content written to file: output.mp3');
        //     // });
        // });
    }

    say(text: string) {
        shelljs.config.execPath = shelljs.which('node')
        shelljs.exec(`echo "${text}" | festival --tts`);
    }
}