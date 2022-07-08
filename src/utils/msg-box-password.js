import { MessageBox, Message } from 'element-ui';
// import { createElement } from 'vue/src/core/vdom/create-element';
import Vue from 'vue';
 const h = Vue.$createElement
 console.log(h, 'h');

 function clickHandler () {
  const inputDom = this.$refs.myInputRef
  const attribute = inputDom.getAttribute('type')
  inputDom.setAttribute('type', attribute === 'text' ? 'password': 'text')
}

export default MessageBox({
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
        click: clickHandler
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
        Message.error('用户密码长度必须介于 5 和 20 之间')
      }
    } else {
      inputDom.value = ''
      done();
    }
  }
}).catch(() => {});