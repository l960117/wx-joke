import Taro ,{ Component } from '@tarojs/taro';
import { View } from '@tarojs/components'
import './login.less'

class Login extends Component {

  config= {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#409EFF',
    navigationBarTitleText: '登陆',
    navigationBarTextStyle: 'white'
  }

  state = {
    username: '',
    passworld: '',
    loading: ''
  }

  goRegister = () => {
    Taro.navigateTo({
      url: '/pages/member/register/register'
    })
  }

  render () {
    return (
      <View className="login-content">
        <View className="login-top">
          <View className="lg-frtit">账户登录</View>
        </View>
        <View className="lg-form">
          <View className="lg-formc">
            <View className="lg-formc-item icon-username">
              <input type="text" name="username"  placeholder="请输入您的用户名" onBlur={(e) => {this.setState({username: e.target.value})}}/>
            </View>
            <View className="lg-formc-item icon-password">
              <input name="password" v-model="loginForm.password" placeholder="请输入您的密码" onBlur={(e) => {this.setState({password: e.target.value})}}/>
            </View>
          </View>
        </View>
        <View className="login-bottom">
          <View className="login-btn">
          </View>
          <View className="forgetpaw">
            <View onClick={this.goRegister} className="register">去注册</View>
            <View className="forgetPsd">忘记密码</View>
          </View>
          <View className="lg-third">
            <View className="lg-third-title">———————第三方登录———————</View>
          </View>
        </View>
      </View>
    )
  }
}
export default Login