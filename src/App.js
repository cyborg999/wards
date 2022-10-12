import React from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

import "./App.css";

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      getUserMediaSupported : false
      , model : false
    }

    this.videoRef = React.createRef();
    this.liveView = React.createRef();

    this.enableWebCam = this.enableWebCam.bind(this);
    this.openCam = this.openCam.bind(this);
    this.predictWebcam = this.predictWebcam.bind(this);
  }

   async predictWebcam() {
    var children = [];

    const predictions = await this.state.model.detect(this.videoRef.current);

    // console.log(predictions)
    for (let i = 0; i < children.length; i++) {
        this.liveView.current.removeChild(children[i]);
      }
      let hl = document.querySelectorAll(".highlighter");
      hl.forEach( boundingBox => {
        boundingBox.remove();
      })
      children.splice(0);
      // console.log("pred", predictions)
      // Now lets loop through predictions and draw them to the live view if
      // they have a high confidence score.
      for (let n = 0; n < predictions.length; n++) {
        // If we are over 66% sure we are sure we classified it right, draw it!
        console.log(predictions[n].score)
        if (predictions[n].score > 0.66) {
          const p = document.createElement('p');
          p.innerText = predictions[n].class  + ' - with ' 
              + Math.round(parseFloat(predictions[n].score) * 100) 
              + '% confidence.';
          p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: '
              + (predictions[n].bbox[1] - 10) + 'px; width: ' 
              + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';
  
          const highlighter = document.createElement('div');
          highlighter.setAttribute('className', 'highlighter');
          highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
              + predictions[n].bbox[1] + 'px; width: ' 
              + predictions[n].bbox[2] + 'px; height: '
              + predictions[n].bbox[3] + 'px;';
  
          this.liveView.current.appendChild(highlighter);
          this.liveView.current.appendChild(p);
          children.push(highlighter);
          children.push(p);
        }
    }
      
    requestAnimationFrame(() => {
      this.predictWebcam();
    });


    // // Now let's start classifying a frame in the stream.
    // await this.state.model.detect(this.videoRef.current).then(function (predictions) {
    //   // Remove any highlighting we did previous frame.
    //   for (let i = 0; i < children.length; i++) {
    //     this.liveView.removeChild(children[i]);
    //   }
    //   children.splice(0);
    //   console.log("pred", predictions)
    //   // Now lets loop through predictions and draw them to the live view if
    //   // they have a high confidence score.
    //   for (let n = 0; n < predictions.length; n++) {
    //     // If we are over 66% sure we are sure we classified it right, draw it!
    //     if (predictions[n].score > 0.66) {
    //       const p = document.createElement('p');
    //       p.innerText = predictions[n].class  + ' - with ' 
    //           + Math.round(parseFloat(predictions[n].score) * 100) 
    //           + '% confidence.';
    //       p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: '
    //           + (predictions[n].bbox[1] - 10) + 'px; width: ' 
    //           + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';
  
    //       const highlighter = document.createElement('div');
    //       highlighter.setAttribute('class', 'highlighter');
    //       highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
    //           + predictions[n].bbox[1] + 'px; width: ' 
    //           + predictions[n].bbox[2] + 'px; height: '
    //           + predictions[n].bbox[3] + 'px;';
  
    //       this.liveView.current.appendChild(highlighter);
    //       this.liveView.current.appendChild(p);
    //       children.push(highlighter);
    //       children.push(p);
    //     }
    //   }
      
    //   // Call this function again to keep predicting when the browser is ready.
    //   window.requestAnimationFrame(this.predictWebcam);
    // })

  }

  openCam(){
    // getUsermedia parameters to force video but not audio.
    const constraints = {
      video: true
    };

    let that = this;
  
    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
      that.videoRef.current.srcObject = stream;
      that.videoRef.current.addEventListener('loadeddata', that.predictWebcam);
    });
  }

  enableWebCam(){
    let { getUserMediaSupported } = this.state;

    if(getUserMediaSupported){
      this.openCam();
      console.log("enable")
    } else {
      console.warn('getUserMedia() is not supported by your browser');
    }
  }

  async componentDidMount(){
    const model = await cocoSsd.load();

    this.setState({
      getUserMediaSupported : !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
      , model : model
    });
  }

  render(){
    return (
      <div className="container">
        <h1>Hello</h1>
        <div ref={ this.liveView } className="camView">
          <button id="webcamButton" onClick={ this.enableWebCam }>Enable Webcam</button>
          <video  autoPlay muted width="640" height="480" ref={ this.videoRef }/>
          <video autoPlay muted width="640" height="480"></video>
        </div>
      </div>
    )
  }
}

export default App;