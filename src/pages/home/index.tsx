import Taro, { Component,Config } from '@tarojs/taro';
import { View, Image } from '@tarojs/components'
import './index.less'

interface IRouterPath {
  [key:string]: string
}

class Home extends Component {

  config: Config= {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#409EFF',
    navigationBarTitleText: '首页',
    navigationBarTextStyle: 'white'
  }

  goTo = (type: string) => {
    let routerPath:IRouterPath = {
      testMain: '/pages/test/main/index',
      joke: '/pages/joke/index',
      userCenter: '/pages/usercenter/center/index'
    }
    Taro.navigateTo({
      url: routerPath[type]
    })
  }
  render () {
    return (
      <View className="home-content">
        <View className="content-top">欢迎进入</View>
        <View className="content-midden">
          <View className="content-item" onClick={() => {this.goTo('testMain')}}>
            <Image src={require('../../assets/images/menuIcon4.png')} />
            <View className="content-item-title">
              <View>进入测试</View>
              <View>更快更方便，省时省力</View>
            </View>
          </View>
          <View className="content-item mgtp" onClick={() => {this.goTo('joke')}}>
            <Image src={require('../../assets/images/menuIcon7.png')} />
            <View className="content-item-title">
              <View>每日幽默</View>
              <View>更快更方便，省时省力</View>
            </View>
          </View>
          <View className="content-item mgtp" onClick={() => {this.goTo('userCenter')}}>
            <Image src={require('../../assets/images/menuIcon5.png')} />
            <View className="content-item-title">
              <View>个人中心</View>
              <View>更快更方便，省时省力</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Home;