import React from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import Preloader from "./Preloader";
import "./../App.css";

class Video extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      getUserMediaSupported : false
      , model : false
      , children : []
      , records : []
      , blobContainer : []
      , preloader : true
    }

    this.videoRef = React.createRef();
    this.liveView = React.createRef();
    this.recorder = React.createRef();
    this.recording = React.createRef();

    this.openCam = this.openCam.bind(this);
    this.predictWebcam = this.predictWebcam.bind(this);
  }

  stopRecording() {
    if (!this.recording.current) {
      return;
    }

    this.recording.current = false;
    this.recorder.current.stop();
    console.log("stopped recording");
    // lastDetectionsRef.current = [];
  }

  startRecording() {
    if (this.recording.current) {
      return;
    }
    let { records } = this.state;
    let that = this;
    this.recording.current = true;
    console.log("start recording");

    let blobContainer = []; 
    this.recorder.current = new MediaRecorder(window.stream);
    this.recorder.current.start();

    this.recorder.current.ondataavailable = function(e) {
      const title = new Date() + "";
      // let blobUrl = window.URL.createObjectURL(new Blob(blobContainer));
      const href = window.URL.createObjectURL(e.data);

      blobContainer.push({
        title : title
        , href : href
      })

      records.push(blobContainer);

      that.setState({
        records : records
      })
    };

    this.recorder.current.onstop = (e) => {
      let blobUrl = window.URL.createObjectURL(new Blob(blobContainer));
      console.log("stop")
      // records.push(blobContainer);
      // that.setState({
      //   records : records
      // })
    }

  }

   async predictWebcam() {
    let { children } = this.state;
    let subjectFound = false;
    const predictions = await this.state.model.detect(this.videoRef.current);

    // console.log(predictions)
    
    for (let i = 0; i < children.length; i++) {
      this.liveView.current.removeChild(children[i]);
    }

    children.splice(0);
    // Now lets loop through predictions and draw them to the live view if
    // they have a high confidence score.
    for (let n = 0; n < predictions.length; n++) {
      // If we are over 66% sure we are sure we classified it right, draw it!
      if (predictions[n].score > 0.66) {
        const p = document.createElement('p');
        p.innerText =  Math.round(parseFloat(predictions[n].score) * 100) 
            + '% ' + predictions[n].class ;
        p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: '
            + (predictions[n].bbox[1] - 10) + 'px; width: ' 
            + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';

        const highlighter = document.createElement('div');
        highlighter.setAttribute('class', 'highlighter');
        let style =  'left: ' + predictions[n].bbox[0] + 'px; top: '
        + predictions[n].bbox[1] + 'px; width: ' 
        + predictions[n].bbox[2] + 'px; height: '
        + predictions[n].bbox[3] + 'px; borderColor: ' + this.getColor();
        highlighter.style = style;

        this.liveView.current.appendChild(highlighter);
        this.liveView.current.appendChild(p);

        children.push(highlighter);
        children.push(p);

        if (predictions[n].class == "person") {
          subjectFound = true;
        }
      }

      if(subjectFound){
        this.startRecording();
      } else {
        this.stopRecording();
      }

      this.setState({
        children : children
      });
    }
   
    requestAnimationFrame(() => {
      this.predictWebcam();
    });

  }

  async openCam(){
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        // getUsermedia parameters to force video but not audio.
        const constraints = {
          video: true
          , audio : false
        };

        let that = this;
      
        // Activate the webcam stream.
        navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
          that.videoRef.current.srcObject = stream;
          window.stream = stream;
          that.videoRef.current.addEventListener('loadeddata', that.predictWebcam);
        });
        
      } catch (error) {
        console.error(error);
      }
    }
    
  }

  getColor(){
    let color = "#";

    for(var i=0;i<6;i++){
      color += Math.floor(Math.random() * 9);
    }

    return color+";";
  }

  async componentDidMount(){
    const model = await cocoSsd.load();
    const supported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)

    this.setState({
      model : model
    });

    if(model){
      console.log("coco loaded", model)
      this.setState({ preloader : false})

      if(supported){
        this.openCam();
        console.log("cam opened")
      } else {
        console.warn('getUserMedia() is not supported by your browser');
      }
    }
  }

  render(){
    let { records, preloader } = this.state;
    
    return (
      <div className="sec_content">
        <Preloader preloader={ preloader }/>
        <div className="sec_videos">
          {!records.length
            ? <><div className="preview" key={1}>
            </div>
            <div className="preview" key={2}>
            </div>
            </>
            : records.map(record => {
                return (
                  <div className="preview"  key={record.title}>
                      <h5 className="card-title">{record.title}</h5>
                      <video controls src={record.href}></video>
                  </div>
                );
            })}
        </div>
        <div className="sec_video">
            <div className="video_container camView" ref={ this.liveView } id="liveView">
              <video  autoPlay muted width="640" height="480" ref={ this.videoRef }/>
            </div>
        </div>
    </div>
    )
  }
}

export default Video;