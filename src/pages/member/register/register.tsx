import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components'
import './register.less'

class Register extends Component {

  config= {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#FFFFFF',
    navigationBarTitleText: '注册',
    navigationBarTextStyle: 'black'
  }

  state = {
    captchaUrl: `http://39.108.232.210:9165/member/captcha?${new Date().getTime()}`,
    checkTerm: false,
    showTerm: false,
    username: '',
    password: '',
    confirmPassword: '',
    captcha: ''
  }

  render () {
    const { captchaUrl, checkTerm, showTerm } = this.state
    return (
      <View className="register-content">
        <View className="content">
          <View className="input-item">
            <input placeholder="请输入用户名" onBlur={(e) => {this.setState({username: e.target.value})}}/>
          </View>
          <View className="input-item">
            <input placeholder="请输入密码" onBlur={(e) => {this.setState({password: e.target.value})}}/>
          </View>
          <View className="input-item">
            <input placeholder="请输入确认密码" onBlur={(e) => {this.setState({confirmPassword: e.target.value})}}/>
          </View>
          <View className="input-item">
            <input placeholder="请输入验证码" onBlur={(e) => {this.setState({captcha: e.target.value})}}/>
            <img src={captchaUrl} onClick={() => {this.setState({captchaUrl: `http://39.108.232.210:9165/member/captcha?${new Date().getTime()}`})}}/>
          </View>
        </View>
        <View className="register-term">
        <Text class="icon iconfont icon-delete8e"></Text>
            <Text 
              class="iconfont iconjiantouarrowheads3"
              className="m-radio-checked"
              onClick={() => {this.setState({checkTerm: false})}}
            >  
            </Text>
          同意服务使用协议 <a onClick={() => {this.setState({checkTerm: true})}}>用户注册协议</a>
        </View>
        <View className="register-bottom">
        </View>
      </View>
    )
  }
}

export default Register;
