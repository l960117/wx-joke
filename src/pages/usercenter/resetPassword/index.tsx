import Taro, { Component, Config } from '@tarojs/taro';
import './index.less';
import { View, Button, Input } from '@tarojs/components';
import { resetPassword } from './service.js'

class ResetPassword extends Component {

  config: Config = {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#FFFFFF',
    navigationBarTitleText: '重置密码',
    navigationBarTextStyle: 'black'
  }
  state = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  changePass = () => {
    const { oldPassword, newPassword, confirmPassword } = this.state
    if (!oldPassword || !newPassword || !confirmPassword) {
      Taro.showToast({
        title: '请输入密码信息',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (newPassword !== confirmPassword) {
      Taro.showToast({
        title: '两次输入的密码不一致，请检查',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let params = {
      oldPassword,
      newPassword,
      confirmPassword
    }
    resetPassword(params).then((res: any) => {
      if (res.resultCode === 200) {
        
      } else {
        Taro.showToast({
          title: res.errorDescription || '密码重置失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch((err: any) => {
      Taro.showToast({
        title: '密码重置失败',
        icon: 'none',
        duration: 2000
      })
    })
  }

  render () {
    return (
      <View className="changePass-content">
        <View className="content">
          <View className="input-item">
            <Input placeholder="请输入旧密码" onBlur={(e) => {this.setState({oldPassword: e.target.value})}}/>
          </View>
          <View className="input-item">
            <Input placeholder="请输入新密码" onBlur={(e) => {this.setState({newPassword: e.target.value})}}/>
          </View>
          <View className="input-item">
            <Input placeholder="请输入确认密码" onBlur={(e) => {this.setState({confirmPassword: e.target.value})}}/>
          </View>
        </View>
        <View className="changePass-bottom">
          <Button type="primary" size="mini" className="btn-common" onClick={this.changePass}>重置密码</Button>
        </View>
      </View>
    )
  }
}

export default ResetPassword;