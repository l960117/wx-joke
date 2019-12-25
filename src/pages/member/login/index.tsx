import Taro ,{ Component, Config } from '@tarojs/taro';
import { View, Button, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.less'

interface LoginProps {
  dispatch: any
}
interface keyValueData {
  [key: string]: string
}

@connect(({ account }) => ({
  ...account,
}))
class Login extends Component<LoginProps, keyValueData> {

  config: Config= {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#409EFF',
    navigationBarTitleText: '登陆',
    navigationBarTextStyle: 'white'
  }
  constructor(props: LoginProps) {
    super(props)
    this.state = {
      username: '',
      password: '',
      loading: false
    }
  }

  componentWillMount () {
    if (Taro.getStorageSync('token') && Taro.getStorageSync('userId')) {
      Taro.reLaunch({ url:'/pages/home/index'})
    }
  }

  goRegister = () => {
    Taro.navigateTo({
      url: '/pages/member/register/index'
    })
  }

  login = () => {
    const { username, password } = this.state
    const { dispatch } = this.props
    if (!username) {
      Taro.showModal({
        title: '提示',
        content: '请输入用户名',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (!password) {
      Taro.showModal({
        title: '提示',
        content: '请输入密码',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    let params = {
      username,
      password
    }
    dispatch({
      type: 'account/loginAction',
      payload: {
        params: params,
        success: () => {
          Taro.navigateTo({
            url: '/pages/home/index'
          })
        },
        fail:(res: any) => {
          Taro.showModal({
            title: '提示',
            content: res.errorDescription || '登录失败，请重试',
            showCancel: false,
            confirmText: '知道了'
          })
        }
      }
    })
  }

  render () {
    const { loading } = this.state
    return (
      <View className="login-content">
        <View className="login-top">
          <View className="lg-frtit">账户登录</View>
        </View>
        <View className="lg-form">
          <View className="lg-formc">
            <View className="lg-formc-item icon-username">
              <Input type="text" name="username"  placeholder="请输入您的用户名" onBlur={(e) => {this.setState({username: e.target.value})}}/>
            </View>
            <View className="lg-formc-item icon-password">
              <Input name="password" v-model="loginForm.password" placeholder="请输入您的密码" onBlur={(e) => {this.setState({password: e.target.value})}}/>
            </View>
          </View>
        </View>
        <View className="login-bottom">
          <View className="login-btn">
            <Button type="primary" size="mini" className="btn-common" onClick={this.login} loading={loading}>{loading ? '登录中...' : '登录'}</Button>
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