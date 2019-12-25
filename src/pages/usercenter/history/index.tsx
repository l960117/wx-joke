import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text } from '@tarojs/components';
import moment from 'moment';
import './index.less';

interface keyValueData {
  [key: string]: any
}

interface HistoryProps {
  history: any,
  userId: string
}

const titleTexT: keyValueData = {
  privity: '默契大作战',
  charm: '魅力值测试',
  safe: '安全感测试',
  anxiety: '焦虑测试'
}

@connect(({ usercenter, account}: keyValueData) => ({
  history: usercenter.history,
  userId: account.userId
}))
class History extends Component<HistoryProps> {

  config: Config= {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#26a2ff',
    navigationBarTitleText: '测试记录',
    navigationBarTextStyle: 'white'
  }

  componentWillMount () {
    const { dispatch, userId } = this.props
    dispatch({
      type: 'usercenter/getTestHistoryAction',
      payload: {
        params: {
          userId
        }
      }
    })
  }

  goToDetail = (id: number) => {
    Taro.navigateTo({
      url: '/pages/test/result/index?testId=' + id
    })
  }

  render () {
    const { history } = this.props
    return (
      <View className="history-wrapper">
        <View className="page-loadmore-wrapper">
          {
            history.map((item: any, index: number) => {
              return (
                <View key={item.id} className="history-content" onClick={() => {this.goToDetail(item.id)}}>
                  <View className="history-item">
                    <View className="history-item-title"><Text>{titleTexT[item.testType]}</Text></View>
                    <View className="history-flex-row">
                      <Text className="flex-1">{moment(item.testTime).format('YYYY-MM-DD HH:mm')}</Text>
                      <Text className="score-text">{item.score}</Text>
                    </View>
                  </View>
                  <Text className="iconfont you-1 right-icon"></Text>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}

export default History