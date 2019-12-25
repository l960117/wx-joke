import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.less';

class Main extends Component {

  config: Config= {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#409EFF',
    navigationBarTitleText: '测试列表',
    navigationBarTextStyle: 'white'
  }

  goTo = (type: string) => {
    Taro.setStorageSync('testType', type)
    Taro.navigateTo({
      url: '/pages/test/question/index'
    })
  }
  
  render () {
    return (
      <View className="main-content">
        <View className="top-content">
          <Text>精选测试</Text>
          <Text>查看全部</Text>
        </View>
        <View className="home-page">
          <View className="list-item bg-1" onClick={() => {this.goTo('anxiety')}}>
            <View className="item-left-content">
              <View className="lf-content-title">默契大作战</View>
              <View className="lf-content-count">666888人已测</View>
              <View className="lf-content-btn">开始测试</View>
            </View>
            <View className="item-right-content">免费</View>
          </View>
          <View className="list-item bg-2" onClick={() => {this.goTo('charm')}}>
            <View className="item-left-content">
              <View className="lf-content-title">魅力值测试</View>
              <View className="lf-content-count">666888人已测</View>
              <View className="lf-content-btn">开始测试 > </View>
            </View>
            <View className="item-right-content">免费</View>
          </View>
          <View className="list-item bg-3" onClick={() => {this.goTo('safe')}}>
            <View className="item-left-content">
              <View className="lf-content-title">安全感测试</View>
              <View className="lf-content-count">666888人已测</View>
              <View className="lf-content-btn">开始测试 > </View>
            </View>
            <View className="item-right-content">免费</View>
          </View>
          <View className="list-item bg-4" onClick={() => {this.goTo('privity')}}>
            <View className="item-left-content">
              <View className="lf-content-title">焦虑测试</View>
              <View className="lf-content-count">666888人已测</View>
              <View className="lf-content-btn">开始测试 > </View>
            </View>
            <View className="item-right-content">免费</View>
          </View>
        </View>
      </View>
    )
  }
}

export default Main;