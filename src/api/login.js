import request from '@/utils/request'
// 获取图形验证码
export const GetcaptchaimageAPI = () => {
  return request.get('/captcha/image')
}
// 获取短信验证码
export const PostcaptchasendSmsCaptchaAPI = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode, captchaKey, mobile
    }
  })
}
// 手机验证码登录
export const PostpassportloginAPI = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      mobile,
      partyData: {},
      smsCode
    }
  })
}
