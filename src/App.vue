<template>
  <div id="app">
    <div style="height: 400px; width: 600px">
      <Player
        fullscreenType="DIY"
        :videoUrl="nowPlayVideoUrl"
      />
      <button @click="changeV">切换视频</button>
    </div>
    <button @click="box">带密码输入框的 msgbox</button>
  </div>
</template>

<script>
import Player from './components/player/index.vue'
export default {
  name: 'App',
  components: {
    Player,
  },
  data () {
    return {
      // flv
      // nowPlayVideoUrl: "//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv",
      // mp4
      // nowPlayVideoUrl: "//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4",
      // hls
      nowPlayVideoUrl: "//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8",
      // nowPlayVideoUrl: ' '
    }
  },
  methods: {
    box1 () {
    },
    clickHandler () {
      const inputDom = this.$refs.myInputRef
      const attribute = inputDom.getAttribute('type')
      inputDom.setAttribute('type', attribute === 'text' ? 'password': 'text')
    },
    // elment-ui 带密码输入框的 msgbox
    box () {
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('div',{}, [
          h('div', {},'请输入新密码'),
          h('div',{ class: 'el-input el-input--suffix mt10', },
          [
            h('input',{
              class: 'el-input__inner',
              attrs: {
                placeholder: '用户密码长度必须介于 5 和 20 之间',
                type: 'password'
              },
              ref: 'myInputRef'
            }),
            h('span',{
              class: 'el-input__suffix',
              on: {
                click: this.clickHandler
              },
            },[
              h('span',{ class: 'el-input__suffix-inner' },
              [h('i', { class: 'el-input__icon el-icon-view el-input__clear' })])
            ])
          ]
          )
        ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            const inputDom = this.$refs.myInputRef
            if (action === 'confirm') {
              const inputPattern = /^.{5,20}$/
              let value = inputDom.value
              const flag = inputPattern.test(value)
              if (flag) {
                inputDom.value = ''
                done(value)
              } else {
                this.$message.error('用户密码长度必须介于 5 和 20 之间')
              }
            } else {
              inputDom.value = ''
              done();
            }
          }
        }).catch(() => {});
    },
    // 测试切换
    changeV () {
      this.nowPlayVideoUrl = this.nowPlayVideoUrl ?  '' : 'http://live.shaoxing.com.cn/video/s10001-sxtv2/index.m3u8'
    }
  },
  created () {
    // 监听浏览器关闭/页面刷新
    // window.onbeforeunload = () => {
    //   console.log('out');
    //   axios('http://localhost:3000')
    // }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.screenshot {
  background: red;
  position: absolute;
  width: 100px;
  height: 100px;
  left: 0;
  top: 0;
}
.vjs-tech {
  pointer-events: none;
}
/* .video-js .vjs-open-fullscreen-control .vjs-icon-placeholder:before {
  content: "\f108";
}
.video-js .vjs-close-fullscreen-control .vjs-icon-placeholder:before {
  content: "\f109";
} */
</style>
