<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>
      <div class="form">
        <div class="form-item">
          <input type="text" class="inp" placeholder="请输入手机号" v-model="mobile" maxlength="11">
        </div>
        <div class="form-item">
          <input type="text" class="inp" placeholder="请输入图形验证码" maxlength="5" v-model="captchaCode">
          <img :src="base64" alt="" @click="GetcaptchaimageData()">
        </div>
        <div class="form-item">
          <input type="text" class="inp" placeholder="请输入短信验证码" v-model="phonecode">
          <button @click="getCode">{{ second === totalSecond ? '获取验证码' : second + `秒后重新发送`}}</button>
        </div>
      </div>
      <div class="login-btn" @click="submit">登录</div>
    </div>
  </div>
</template>

<script>
import { GetcaptchaimageAPI, PostcaptchasendSmsCaptchaAPI, PostpassportloginAPI } from '@/api/login'
export default {
  name: 'LoginIndex',
  data () {
    return {
      mobile: '', // 接收验证码手机
      base64: '', // 图形验证码
      key: '', // 图形验证码key
      captchaCode: '', // 用户输入的图形验证码
      timer: null, // 定时器id
      totalSecond: 60, // 总秒数
      second: 60, // 倒计时秒数
      phonecode: '' // 用户输入的手机验证码
    }
  },
  created () {
    this.GetcaptchaimageData()
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    // 校验输入框内容
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.captchaCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 获取图形验证码
    async GetcaptchaimageData () {
      const res = await GetcaptchaimageAPI()
      this.base64 = res.data.base64
      this.key = res.data.key
    },
    // 倒计时获取短信验证码
    async getCode () {
      if (!this.validFn()) {
        return
      }
      if (!this.timer && this.second === this.totalSecond) {
        // 发送验证码
        await PostcaptchasendSmsCaptchaAPI(this.captchaCode, this.key, this.mobile)
        this.$toast('发送成功，请注意查收')
        this.timer = setInterval(() => {
          this.second--
          if (this.second < 1) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },
    // 登录
    async submit () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.phonecode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      const Url = this.$route.query.backUrl || '/'
      const res = await PostpassportloginAPI(this.mobile, this.phonecode)
      this.$toast('登录成功')
      this.$store.commit('user/setUserinfo', res.data)
      this.$router.replace(Url)
    }
  }

}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;

    h3 {
      font-size: 26px;
      font-weight: normal;
    }

    p {
      margin-top: 10px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;

    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;

    }

    img {
      width: 94px;
      height: 31px;
    }

    button {
      height: 31;
      border: none;
      color: #cea26a;
      background-color: transparent;
      font-size: 14px;
      padding-right: 8px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 2px;
  }
}
</style>
