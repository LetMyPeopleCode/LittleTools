# SmallRecorder

SmallRecorder is a fork of a fork of Matt Diamond's immensely useful Recorder.js, which makes it simple to record audio from a user's microphone (with their permission) using HTML5. The purpose of SmallRecorder is to turn the captured audio into a simple 16khz mono WAV format binary blob for easy consumption by and transmission to a number of services.

## How To Use

Initializing the recorder:
```
function initializeRecorder() {

    function startUserMedia(stream) {
        var input = audio_context.createMediaStreamSource(stream);
        recorder = new Recorder(input);
       }
       
    try {
        // webkit shim
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext;
        navigator.getUserMedia = navigator.mozGetUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia;
        window.URL = window.URL || window.webkitURL;
        audio_context = new AudioContext();
    } catch (e) {
        alert('No web audio support in this browser!');
    }

    navigator.getUserMedia({ audio: true }, startUserMedia, function (e) {
    });
}
```

Start a recording:
```
recorder.clear(); // do this to clear the audio buffer or you'll append
recorder && recorder.record();
```

Stop a recording and get the buffer contents as a 16khz mono wav:
```
recorder && recorder.stop();
recorder && recorder.exportWAV(function (blob) {
    //do stuff with the blob
});
```

### Let's borrow the copyright and license from Matt Diamond's original...

## License (MIT)

Copyright © 2013 Matt Diamond

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
