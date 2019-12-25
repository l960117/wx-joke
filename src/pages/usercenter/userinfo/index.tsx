import Taro, { Component, Config} from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text, Image } from '@tarojs/components';
import './index.less'

interface UserInfoProps {
  userInfo: any,
  account: any
}

interface keyValueData {
  [key: string]: any
}

@connect(({ account}: keyValueData) => ({
  account,
  userInfo: account.userInfo
}))
class UserInfo extends Component<UserInfoProps> {

  config: Config = {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#FFFFFF',
    navigationBarTitleText: '个人信息',
    navigationBarTextStyle: 'black'
  }
  
  changePass = () => {
    Taro.navigateTo({
      url: '/pages/usercenter/resetPassword/index'
    })
  }

  changeSex = () => {
    
  }

  render () {

    const { userInfo } = this.props
    return (
      <View className="userinfo">
        <View className="userinfo-content">
          <View className="userinfo-content-avatar">
            <Text>头像</Text>
            <View className="userinfo-content-avatar-right">
              <View className="userinfo-content-avatar-right-upload">
                <View className="userinfo-content-avatar-right-box">
                  <Image src={userInfo.avatar ? `/avatar/${userInfo.avatar}` : require('@/assets/images/logo.jpg')} />
                </View>
              </View>
            </View>
          </View>
          <View className="userinfo-content-nickname">
            <Text>昵称</Text>
            <View className="userinfo-content-nickname-right">
              {
                userInfo.nickname ? 
                <Text>{userInfo.nickname}</Text>
                :
                <Text>未填写</Text>
              }
            </View>
          </View>
          <View className="userinfo-content-sex">
            <Text>性别</Text>
            <View className="userinfo-content-sex-right" onClick={this.changeSex}>
              {
                userInfo.sex ? 
                <Text>{userInfo.sex}</Text>
                :
                <Text>未知</Text>
              }
            </View>
          </View>
          <View className="userinfo-content-brithday">
            <Text>出生日期</Text>
            <View className="userinfo-content-brithday-right">
              {
                userInfo.birthday ? 
                <Text>{userInfo.birthday}</Text>
                :
                <Text>未填写</Text>
              }
            </View>
          </View>
          <View className="userinfo-content-worker">
            <Text>职业</Text>
            <View className="userinfo-content-worker-right">
              {
                userInfo.profession ? 
                <Text>{userInfo.profession}</Text>
                :
                <Text>未填写</Text>
              }
            </View>
          </View>
          <View className="userinfo-content-qq">
            <Text>QQ</Text>
            <View className="userinfo-content-qq-right">
              {
                userInfo.qq ? 
                <View>{userInfo.qq}</View>
                :
                <Text>绑定</Text>
              }
            </View>
          </View>
          <View className="userinfo-content-wechat">
            <Text>微信</Text>
            <View className="userinfo-content-wechat-right">
              {
                userInfo.wx ? 
                <View>{userInfo.wx}</View>
                :
                <Text>绑定</Text>
              }
            </View>
          </View>
          <View className="userinfo-content-pass">
            <Text>密码</Text>
            <View className="userinfo-content-pass-right">
              <Text onClick={this.changePass}>修改</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
export default UserInfo
