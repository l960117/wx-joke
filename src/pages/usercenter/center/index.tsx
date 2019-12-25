import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Button, Image, Text } from '@tarojs/components';
import './index.less';

interface centerProps {
  userInfo: any
}
interface IRouterPath {
  [key: string]: string
}
interface keyValueData {
  [key: string]: any
}

@connect(({ account }: keyValueData) => ({
  userInfo: account.userInfo
}))
class Center extends Component<centerProps> {

  config: Config= {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#26a2ff',
    navigationBarTitleText: '个人中心',
    navigationBarTextStyle: 'white'
  }

  goToPath = (type: string) => {
    const routerPath: IRouterPath = {
      userInfo: '/pages/usercenter/userInfo/index',
      history: '/pages/usercenter/history/index',
      collect: '/pages/usercenter/collect/index',
      integration: '/pages/usercenter/integration/index',
      contactUs: '/pages/usercenter/contactUs/index'
    }
    Taro.navigateTo({url: routerPath[type]})
  }
  loginOut = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'account/loginOutAction',
      payload: {}
    })
    Taro.reLaunch({url: '/pages/member/login/index'})
  }

  render () {
    const { userInfo } = this.props
    return (
      <View className="usercenter">
        <View className="usercenter-top">
          <View className="usercenter-top-info">
            <Image src={userInfo.avatar ? `/avatar/${userInfo.avatar}` : require('@/assets/images/logo.jpg')} />
            <View className="usercenter-top-info-text" onClick={() => { this.goToPath('userInfo') }}>
              <View>{userInfo.nickname ? userInfo.nickname : '游客33589'}</View>
              <View>{userInfo.intro ? userInfo.intro : '这个人很懒，什么都没留下...'}</View>
            </View>
            <View className="usercenter-top-info-right" onClick={() => { this.goToPath('userInfo') }}>
              <Text className="iconfont you-1 right-icon"></Text>
            </View>
          </View>
        </View>
        <View className="usercenter-content">
          <View className="usercenter-content-menu">
            <View onClick={() => { this.goToPath('history') }}>
              <Image src={require("@/assets/images/mI1.png")} />
              <View>测试记录</View>
            </View>
            <View onClick={() => { this.goToPath('collect') }}>
              <Image src={require("@/assets/images/mI2.png")} />
              <View>收藏记录</View>
            </View>
            <View onClick={() => { this.goToPath('integration') }}>
              <Image src={require("@/assets/images/mI3.png")} />
              <View>积分</View>
            </View>
          </View>
          <View className="usercenter-content-loginout">
            <Button type="primary" size="default" onClick={this.loginOut}>安全登出</Button>
          </View>
        </View>
      </View>
    )
  }
}

export default Center
