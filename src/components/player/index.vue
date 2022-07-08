<template>
  <!-- video.js 内嵌截图、录像，自定义全屏, 可播放 mp4、hls、flv -->
  <div
    :style="{ width: videoWidth, height: videoHeight, position: 'relative' }"
    class="display"
  >
    <video
      style="width: 100%; height: 100%"
      class="video-js"
      ref="player"
      v-show="videoUrl"
    >
    </video>
    <!-- 视频路径为空时 -->
    <div
      v-show="!hasVideoUrl"
      :style="{
        height: videoWidth,
        width: videoHeight,
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 2,
        background: '#000',
      }"
    >
      no video
    </div>
  </div>
</template>

<script>
import '@/assets/css/custom-video.css'
import videojs from '@/utils/video'
export default {
  name: 'My-Player',
  props: {
    name: {
      type: String,
      default: "my-video",
    },
    // 视频地址
    videoUrl: {
      type: String,
      default: "",
    },
    //视频宽度
    videoWidth: {
      type: String,
      default: "100%",
    },
    //视频高度
    videoHeight: {
      type: String,
      default: "100%",
    },
    // 全屏类型
    fullscreenType: {
      type: String,
      default: "initial",
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ["none", "DIY", "initial"].indexOf(value) !== -1;
      },
    },
    // 全屏状态改变 当fullscreenType为DIY时有效
    fullscreenChange: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    const options = 
      {
        // 截图、录制Bar
        customBar: {
          screenshot: true,
          recorder: true
        },
        // 封面图
        poster: '',
        language: "zh-CN",
        // 设置自动播放
        autoplay: true,
        // 设置了它为true，才可实现自动播放,同时视频也被静音 （Chrome66及以上版本，禁止音视频的自动播放）
        muted: true,
        // 预加载
        preload: "none",
        // 显示播放的控件
        controls: true,
        // 进度条
        liveui: true,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        // 播放速率
        playbackRates: [0.5, 1, 2, 4, 8, 16],
        controlBar: {
          // 画中画
          pictureInPictureToggle: false,
          // 当前时间和持续时间的分隔符
          timeDivider: true,
          // 显示持续时间
          durationDisplay: true,
          // 是否显示剩余时间功能
          remainingTimeDisplay: true,
          // 是否显示全屏按钮
          fullscreenToggle: this.fullscreenType === "initial" ? true : false,
          // fullscreenToggle: true,
        },
    }
    return {
      options,
      // 自定义全屏
      isDIYFullscreen: false,
      // videoUrl 从无到有时会显示一会视频错误信息
      // 使用该字段判断 no-video 来避免显示错误信息
      hasVideoUrl: false,
      // 视频流类型
      videoTypeObj: {
        mp4: 'video/mp4',
        flv: 'video/x-flv',
        m3u8: 'application/x-mpegURL'
      }
    };
  },
  methods: {
    getVideo(nowPlayVideoUrl) {
      if (!nowPlayVideoUrl) this.hasVideoUrl = false;
      if (!this.player) {
        this.player = videojs(this.$refs.player, this.options);
        // 自定义全屏功能
        if (this.fullscreenType === "DIY") this.setDIYFullscreen();
      }
      // 重置播放器
      this.player.reset()
      this.player.src([
        {
          src: nowPlayVideoUrl,
          type: this.videoUrl
          ?
          this.videoTypeObj[this.videoUrl.split('.').slice(-1)]
          :
          ''
        },
      ]);
      setTimeout(() => {
        this.hasVideoUrl = !!nowPlayVideoUrl;
      }, 100);
    },
    setDIYFullscreen() {
      const fullscreenButton = this.player.controlBar.addChild("button");
      fullscreenButton.controlText("全屏");
      fullscreenButton.addClass("vjs-fullscreen-control");
      const fullscreenButtonDom = fullscreenButton.el();
      fullscreenButtonDom.onclick = () => {
        this.isDIYFullscreen = !this.isDIYFullscreen;
        if (this.isDIYFullscreen) {
          this.player.addClass("vjs-fullscreen");
          fullscreenButton.controlText("退出全屏");
          console.log('全屏');
        } else {
          this.player.removeClass("vjs-fullscreen");
          fullscreenButton.controlText("全屏");
          console.log('退出全屏');
        }
        // 父组件回调
        this.fullscreenChange(this.isDIYFullscreen, this.name);
      };
    }
  },
  watch: {
    //监听视频地址、video的id值
    videoUrl: {
      deep: true,
      immediate: true,
      handler(val) {
        this.$nextTick(() => {
          this.getVideo(val);
        });
      },
    },
  },
  beforeDestroy() {
    // 组件销毁时，清除播放器
    if (this.player) this.player.dispose();
  },
};
</script>