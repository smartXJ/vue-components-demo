import videojs from "video.js";
import video_zhCN from "video.js/dist/lang/zh-CN.json";
import RecordRTC from "recordrtc";
import "videojs-contrib-hls";
import "videojs-flvjs-es6";
// 截图图片
import cameraImg from '../assets/images/camera.png'
// 录制图片
import monitorImg from '../assets/images/monitor.png'
videojs.addLanguage("zh-CN", video_zhCN);

// 创建 截图、录像
var Component = videojs.getComponent("Component");
// The videojs.extend function can be used instead of ES6 classes.
var CustomBar = videojs.extend(Component, {
  constructor: function (player, options) {
    // Equivalent of `super(this, arguments)`
    Component.apply(this, arguments);
    // player 实列
    this.player = player
    // 录像所需要的 canvas
    this.canvas = null
    // 录像实列
    this.recorder = null
    // 停止循环帧 需要用到的参数
    this.animationFrame = null
    // 录像状态 false 未录像 true 录像中
    this.isRecorder = false
    // 隐藏截图
    if (options.screenshot === false) this.hiddenEl(0)
    // 隐藏录像
    if (options.recorder === false) this.hiddenEl(1)
  },
  createEl: function () {
    // <img src="${cameraImg}" style="width:13px" />
    // <i class="el-icon-camera-solid"></i>
    // <i class="el-icon-video-camera-solid"></i>
    const divDom = videojs.dom.createEl('div', {
      className: 'vjs-custom-bar',
      innerHTML: `
        <div  class="vjs-custom-control-bar vjs-button ac">
          <img src="${cameraImg}" style="width:13px" />
          <span class="ml10">截图</span>
        </div>
        <div class="mt10 vjs-custom-control-bar ac" >
          <img src="${monitorImg}" style="width:13px" />
          <span class="ml10">录像</span>
        </div>
      `
    })
    const [screenshotDom, recordDom] = divDom.querySelectorAll('div')
    screenshotDom.onclick = () => this.screenshotHandle()
    recordDom.onclick = () => this.recordHandle(recordDom)
    return divDom
  },
  // 截图
  screenshotHandle() {
    const fileType = "png";
    // 找到需要截图的video标签
    // video 实列
    const video = this.player.el().querySelector('video')
    // const video = this.video;
    console.log(video, 'video');
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    console.log(canvas, 'canvas')
    canvas
      .getContext("2d")
      .drawImage(video, 0, 0, canvas.width, canvas.height); // 图片大小和视频分辨率一致
    const strDataURL = canvas.toDataURL("image/" + fileType); // canvas中video中取一帧图片并转成dataURL
    let arr = strDataURL.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const blob = new Blob([u8arr], {
      type: mime,
    });
    const url = window.URL.createObjectURL(blob);
    this.downloadFile(url, "png");
  },
  // 录像
  recordHandle (recordDom) {
    this.isRecorder = !this.isRecorder
    if (this.isRecorder) {
      recordDom.innerHTML = `<i class="record-procees"></i><span class="ml10">结束</span>`
      if (!this.canvas) this.canvas = document.createElement("canvas");
      this.recorder = RecordRTC(this.canvas, {
        type: "canvas",
      });
      this.recorder.startRecording();
      this.drawMedia();
    } else {
      // recordDom.innerHTML = `<i class="el-icon-video-camera-solid"></i><span class="ml10">录像</span>`
      recordDom.innerHTML = `<img src="${monitorImg}" style="width:13px" /><span class="ml10">录像</span>`
      this.recorder.stopRecording(() => {
        const url = window.URL.createObjectURL(this.recorder.getBlob());
        this.downloadFile(url, "mp4");
        cancelAnimationFrame(this.animationFrame);
        this.canvas = null;
        this.animationFrame = null;
      });
    }
  },
  // 刷新canvas
  drawMedia() {
    const ctx = this.canvas.getContext("2d");
    // 找到需要截图的video标签
    const video = this.player.el().querySelector('video')
    this.canvas.setAttribute("width", video.videoWidth);
    this.canvas.setAttribute("height", video.videoHeight);
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    // requestAnimationFrame 根据电脑显示帧数进行循环
    this.animationFrame = requestAnimationFrame(() => this.drawMedia());
  },
  // 下载
  downloadFile: function (blob, fileType) {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = blob;
    // const time = this.parseTime(new Date())
    const time = new Date().getTime();
    a.download = `${time}.${fileType}`;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blob);
    }, 1000);
  },
  hiddenEl (index) {
    const myDom = this.el().querySelectorAll('div')[index]
    myDom.setAttribute('style', 'display:none')
  }
});
// 注册
videojs.registerComponent('CustomBar', CustomBar);

export default videojs