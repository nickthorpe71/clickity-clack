Goals:
- define component structure
- differentiate reusable and specific components 
- define abstract state
- prevent "bad states" ex. being in an error and success state at the same time
- understand the scope of states and where they might be tracked in the application
- understand where specific data is needed
- be able to follow the component/state tree to see and replicate where the user is
    eg. site::loggedIn > freestyleModal::open > videoRecorder::recording


Setting State:
- state can be changed by passing it into a child component
    eg. see videoRecorder below
  or it can be referenced by component/state path 
    eg. ->onClick = @@root::loggedOut

Elements:
// = description of element
- component
    {} = logic component definition
        {r} = reusable 
        {s} = specific
    $$ = logic component reference 
    [] = visual component definition
        [r] = reusable 
        [s] = specific
    @@ = visual component reference
- state
    :: = state definition
- behavior
    -> = state behavior definition
    .  = component behavior definition

---------------------------------- Video Recorder Example --------------------------------------

[r]title(text:string, size: small | medium | large)
    // https://www.figma.com/file/1Q2J2Z1Z3Q4Z4Y4qZ2q1Z1/Video-Recorder?node-id=0%3A1

{r}s3Service(bucketUrl, data)
    // sends data to S3
    .sendToBucket(bucketUrl, data)

{r}socketStream(destination, data)
    // used to stream data from frontend to back end while video is recording

{r}httpService(url, data?)
    // sends data to the specified endpoint
    .get(url)
    .post(url, data)
    .put(url, data)
    .delete(url, data)

[s]digitalProfileRecorder
    @@videoRecorder(
        onRecordingComplete: 
            (recordingData) => $$httpService.post("https://digitalprofile", recordingData)
    )

[s]freestyleRecorder
    @@title("Let's Freestyle!", medium)
    @@videoRecorder(
        onRecordingComplete: (recordingData) => $$s3Service.sendToBucket("https://s3.tmu.recordings", recordingData)
        whileRecording: (recordingDataChunk) => $$socketStream("ws://videoSocketSteam", recordingDataChunk)
    )

[r]videoRecorder(onRecordingComplete?: (d) => void, whileRecording?: (d) => void)
    // video recorder frame with rounded corners
    // https://www.figma.com/file/1Q2J2Z1Z3Q4Z4Y4qZ2q1Z1/Video-Recorder?node-id=0%3A1
    ::notRecording
        @@recordingButton(:state)
        @@timeDisplay(0)
        @@micVolumeIndicator(micVolume)
        ->onEnterState = (recordingData) => {recordingData ? onRecordingComplete(recordingData) : null}
        ->onError = @@self::error
    ::isRecording
        // when recording collect video data from webcam
        @@recordingButton(:state)
        @@timeDisplay(currentTime)
        @@micVolumeIndicator(micVolume)
        ->whileInState = (recordingDataChunk) => {whileRecording(recordingDataChunk)}
        ->onError = @@self::error
    ::error
        ->onEnterState = (recordingData) => {recordingData ? onRecordingComplete(recordingData) : null}
        [s]errorText
        // simple centered text saying "Video not available"


[s]recordingButton(recordingState: state)
    // the recording button is a circle with a white border and a red symbol in the middle
    ::notRecording(recordingState)
        // when not recording the symbol is a red circle
        // https://www.figma.com/file/1Q2J2Z1Z3Q4Z4Y4qZ2q1Z1/Video-Recorder?node-id=0%3A1
        ->onClick = recordingState::isRecording
    ::isRecording(recordingState)
        // when recording the symbol is a red square
        // https://www.figma.com/file/1Q2J2Z1Z3Q4Z4Y4qZ2q1Z1/Video-Recorder?node-id=0%3A1
        ->onClick = recordingState::notRecording

[s]timeDisplay(currentTime: number)
    // display current time in the pattern HH:MM:SS

[s]micVolumeIndicator(micVolume: number)
    // visualize mic input volume with 6 vertical bars


================================================================================================

