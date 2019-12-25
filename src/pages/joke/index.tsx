import Taro, { Component, Config } from '@tarojs/taro';
import './index.less'
import { View } from '@tarojs/components'
import getJokeData from './service'


class Joke extends Component {

  config: Config = {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#FFFFFF',
    navigationBarTitleText: '幽默笑话',
    navigationBarTextStyle: 'black'
  }

  state = {
    jokeList: [],
    isLoading: true
  }

  componentWillMount () {
    getJokeData().then((res: any) => {
      if (res.resultCode === 200) {
        this.setState({
          jokeList: res.data
        })
      } else {
        Taro.showToast({
          title: res.errorDescription|| '获取失败，请重试！',
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch((err: any) => {
      Taro.showToast({
        title: '获取失败，请重试！',
        icon: 'none',
        duration: 2000
      })
    })
  }

  render () {
    const { jokeList } = this.state
    return (
      <View className="joke-page">
        <View className="joke-list">
          {
            jokeList&&jokeList.map((item, index) => {
              return (
                <View className="joke-item" key={index}>
                  <View className="joke-item-text">{ item.content }</View>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}

export default Joke;