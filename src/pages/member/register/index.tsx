import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Input, Image } from '@tarojs/components'
import './index.less'
import registerUser from './service'

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

  register = () => {
    const { username, password, confirmPassword, captcha } = this.state
    let params = {
      username,
      password,
      confirmPassword,
      captcha
    }
    registerUser(params).then((res) => {

    })
    .catch((res) => {

    })
  }

  render () {
    const { captchaUrl, checkTerm, showTerm } = this.state
    return (
      <View className="register-content">
        <View className="content">
          <View className="input-item">
            <Input placeholder="请输入用户名" onBlur={(e) => {this.setState({username: e.target.value})}}/>
          </View>
          <View className="input-item">
            <Input placeholder="请输入密码" onBlur={(e) => {this.setState({password: e.target.value})}}/>
          </View>
          <View className="input-item">
            <Input placeholder="请输入确认密码" onBlur={(e) => {this.setState({confirmPassword: e.target.value})}}/>
          </View>
          <View className="input-item">
            <Input placeholder="请输入验证码" onBlur={(e) => {this.setState({captcha: e.target.value})}}/>
            <Image className="captchaImg" src={captchaUrl} onClick={() => {this.setState({captchaUrl: `http://39.108.232.210:9165/member/captcha?${new Date().getTime()}`})}}/>
          </View>
        </View>
        <View className="register-term">
          {
            checkTerm ? 
            <Text
              className="iconfont icontiaokuanxuanzhong- m-radio-checked"
              onClick={() => {this.setState({checkTerm: false})}}
            >  
            </Text>
            :
            <Text
              className="iconfont icontiaokuanweixuanzhong- m-radio"
              onClick={() => {this.setState({checkTerm: true})}}
            >  
            </Text>
          }
          同意服务使用协议 <a onClick={() => {this.setState({checkTerm: true})}}>用户注册协议</a>
        </View>
        <View className="register-bottom">
          <Button type="primary" size="mini" className="btn-common" onClick={this.register} disabled={!checkTerm}>注册</Button>
        </View>
      </View>
    )
  }
}

export default Register;
