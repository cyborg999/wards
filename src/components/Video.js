import React from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import Preloader from "./Preloader";
import "./../App.css";
import server from "./../config/server";
import axios from "axios";

class Video extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      getUserMediaSupported : false
      , model : false
      , children : []
      , records : []
      , preloader : true
      , settings : {
        allow_audio: false
        , percentage : 66
        , obj : {}
      }
    }

    this.videoRef = React.createRef();
    this.liveView = React.createRef();
    this.recorder = React.createRef();
    this.recording = React.createRef();

    this.loadSettings = this.loadSettings.bind(this);
    this.openCam = this.openCam.bind(this);
    this.predictWebcam = this.predictWebcam.bind(this);
  }

  stopRecording() {
    if (!this.recording.current) {
      return;
    }

    this.recording.current = false;
    this.recorder.current.stop();
  }

  startRecording(tags) {
    if (this.recording.current) {
      return;
    }
    let user = JSON.parse(sessionStorage.getItem("user"));
    let { records } = this.state;
    let that = this;
    this.recording.current = true;
    console.log("start recording");

    this.recorder.current = new MediaRecorder(window.stream);
    this.recorder.current.start();
    this.recorder.current.onerror = (e) => {
      console.log(e.error)
    }

    const blobContainer = [];

    this.recorder.current.ondataavailable = function(e) {
      const title = new Date() + "";
      const href = URL.createObjectURL(e.data);

      blobContainer.push(e.data);
      console.log("ondataavailable")
      try {
        

        //check first if video is valid 
        let postData = {
          href : href
          , tag : tags.join()
          , title : title
          , id : user.id
        }
        console.log("POSTDATA", postData)
         axios.post(server.url+"/addvideo",  postData).then(res=> {
          console.log("isadded", res)
          if(res.data){
            records.push({ href, title });
            that.setState({
              records : records
            });
          }
        });

      }
      catch (error) {
        console.log(error);
      }
    }

    this.recorder.current.onstop = async e => {
   
      console.log("onstop", blobContainer)
   let frm = new FormData(document.getElementById("frmVid"));
   frm.append("blobFile", new Blob(blobContainer));
   console.log(frm)

    let response = await fetch(server.url+"/addvideo", {
        method: 'POST',
        body: new FormData(document.getElementById("frmVid"))
      });

      console.log(frm)
      // axios.post(server.url+"/addvideo",  {body : formData}).then(res=> {
      //   console.log(res)
      // });
    }

  }

   async predictWebcam() {
    let { children, settings } = this.state;
    var subjectFound = false;
    let tags = [];
    const predictions = await this.state.model.detect(this.videoRef.current);

    for (let i = 0; i < children.length; i++) {
      this.liveView.current.removeChild(children[i]);
    }

    children.splice(0);
    // Now lets loop through predictions and draw them to the live view if
    // they have a high confidence score.
    for (let n = 0; n < predictions.length; n++) {
      let percen = settings.percentage/100;

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

        let target = predictions[n].class;
        // console.log(settings.obj)
        settings.obj.length && settings.obj.forEach( obj => {
          if(obj["label"] == target){
            subjectFound = true;

            if(!tags.includes("target")){
              tags.push(target)
            }
          }
        })

        // if (predictions[n].class == "person") {
        //   subjectFound = true;
        // }
      } 
  

      if(subjectFound){
        this.startRecording(tags);
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
      console.log("Allow",this.state.settings.allow_audio)
      try {
        // getUsermedia parameters to force video but not audio.
        const constraints = {
          video: true
          , audio : this.state.settings.allow_audio
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

  loadSettings(){
    let user = JSON.parse(sessionStorage.getItem("user"));
    let that = this;
    
    axios.post(server.url+"/userSettings", { "id" : user.id }).then(res => {
      let userSettings =  {
        allow_audio: false
        , percentage : 66
        , obj : {}
      }
      
      if(res.data.settings.length){
        userSettings.allow_audio = res.data.settings[0].allow_audio;
        userSettings.percentage = res.data.settings[0].percentage;
      } 

      if(res.data.tags.length){
        userSettings.obj = res.data.tags;
      } 

      that.setState({
        settings : userSettings
      })

    });
  }

  async componentDidMount(){
    const model = await cocoSsd.load();
    const supported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    await this.loadSettings();
    this.setState({
      model : model
    });

    if(model){
      console.log("coco loaded", model)
      this.setState({ preloader : false})

      if(supported){
        await this.openCam();
        // console.log("cam opened")
      } else {
        console.warn('getUserMedia() is not supported by your browser');
      }
    }
  }

  render(){
    let { records, preloader } = this.state;
    
    return (
      <>
          <form id="frmVid">
            <input type="hidden" name="addVid" value="1"/>
          </form>
          <Preloader preloader={ preloader }/>
          <div className="sec_videos">
            {!records.length
              ? <><div className="preview" key={1}>
              </div>
              <div className="preview" key={2}>
              </div>
              </>
              : records.map( (record, idx) => {
                  return (
                    <div className="preview"  key={ idx }>
                        {/* <h5 className="card-title">{record.title}</h5> */}
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
      </>
    )
  }
}

export default Video;