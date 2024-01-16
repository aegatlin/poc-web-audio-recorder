class Recorder {
  async record() {
    /**
     * It makes since to do this at the last second because browser will request
     * permission to access microphone. Permission requests in response to user actions
     * is best practice.
     */
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API
     */
    this.mediaRecorder = new MediaRecorder(mediaStream);

    this.mediaRecorder.start();
  }

  stop() {
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/dataavailable_event
     *
     * The dataavailable event will usually just fire once on stop. This will potentially
     * be a very large audio chunk. In order to slice it up you can pass a `ms` value
     * to the `recorder.start()` call.
     *
     * For simple use cases you can pass nothing to `start()` and expect a single audio chunk
     * on stop.
     */
    this.mediaRecorder.ondataavailable = (e) => {
      this.audioBlob = e.data;
    };

    this.mediaRecorder.stop();
  }

  logAudioBlob() {
    console.log(this.audioBlob);
  }
}
