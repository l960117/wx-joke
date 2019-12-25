import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text, Image } from '@tarojs/components';
import './index.less';
import getResultById from './service.js'

interface ResultProps {
  userInfo: any
}

interface keyValueData {
  [key: string]: any
}

@connect(({ account }: keyValueData) => ({
  userInfo: account.userInfo
}))
class Result extends Component<ResultProps> {

  config: Config= {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#409EFF',
    navigationBarTitleText: '测试结果',
    navigationBarTextStyle: 'white'
  }
  state = {
    resultList: [],
    tagList: [],
    isShowOther: false
  }

  componentWillMount () {
    console.log(this.$router.params)
    let params = {
      testId: this.$router.params.testId
    }
    getResultById(params).then((res: any) => {
      if (res.resultCode === 200) {
        this.setState({
          resultList: res.data.resultList,
          tagList: res.data.tagList
        })
      }
    })
    .catch((err: any) => {
      console.log(err)
    })
  }

  render () {
    const { userInfo } = this.props
    const { resultList, tagList, isShowOther } = this.state

    return (
      <View className="result-content">
        <View className="top"></View>
        <View className="content">
          <View className="content-header">
            <Image src={userInfo.avatar ? `/avatar/${userInfo.avatar}` : require('@/assets/images/logo.jpg')} />
            <View className="content-header-right">
              <View className="content-header-right-top">
                <View></View>
                <View>{userInfo.nickname}</View>
                <View style={{"clear": "both"}}></View>
              </View>
              <View className="tag-content">
                {
                  tagList.map((item: any) => {
                    return (
                      <View key={item.labelId} className="tag-item">{item.label}</View>
                    )
                  })
                }
              </View>
            </View>
          </View>
          <View className="content-layout-data">
            <View className="content-layout-data-item">
              <View className="content-layout-data-item-tp">外向</View>
              <View></View>
              <View className="content-layout-data-item-dn">内向</View>
            </View>
            <View className="content-layout-empty-item">
              <View className="content-layout-empty-tp">  </View>
              <View></View>
              <View className="content-layout-empty-dn">  </View>
            </View>
            <View className="content-layout-data-item">
              <View className="content-layout-data-item-tp">追求</View>
              <View></View>
              <View className="content-layout-data-item-dn">知足</View>
            </View>
            <View className="content-layout-empty-item">
              <View className="content-layout-empty-tp">  </View>
              <View></View>
              <View className="content-layout-empty-dn">  </View>
            </View>
            <View className="content-layout-data-item">
              <View className="content-layout-data-item-tp">自主</View>
              <View></View>
              <View className="content-layout-data-item-dn">通融</View>
            </View>
            <View className="content-layout-empty-item">
              <View className="content-layout-empty-tp">  </View>
              <View></View>
              <View className="content-layout-empty-dn">  </View>
            </View>
            <View className="content-layout-data-item">
              <View className="content-layout-data-item-tp">亲密</View>
              <View></View>
              <View className="content-layout-data-item-dn">独立</View>
            </View>
            <View className="content-layout-empty-item">
              <View className="content-layout-empty-tp">  </View>
              <View></View>
              <View className="content-layout-empty-dn">  </View>
            </View>
            <View className="content-layout-data-item">
              <View className="content-layout-data-item-tp">随性</View>
              <View></View>
              <View className="content-layout-data-item-dn">计划</View>
            </View>
            <View className="content-layout-empty-item">
              <View className="content-layout-empty-tp">  </View>
              <View></View>
              <View className="content-layout-empty-dn">  </View>
            </View>
            <View className="content-layout-data-item">
              <View className="content-layout-data-item-tp">融入</View>
              <View></View>
              <View className="content-layout-data-item-dn">独处</View>
            </View>
          </View>
          <View className="content-layout-word">
            {
              resultList&&resultList.length > 1 && !isShowOther ?
              <View className="content-layout-word-other-item">
                <View></View>
                <View><Text></Text>{resultList[0].content}</View>
                <View style={{"clear": "both"}}></View>
              </View>
              :
              <View>
              {
                resultList.map((item: any, index: number) => {
                  return (
                    <View className="content-layout-word-other-item" key={item.introId}>
                      <View></View>
                      <View><Text>{index + 1}.</Text>{item.content}</View>
                      <View style={{"clear": "both"}}></View>
                    </View>
                  )
                })
              }
              </View>
            }
            <View className="content-layout-word-more" onClick={() => {this.setState({isShowOther: !isShowOther})}}>{isShowOther ? '收起' : '查看更多'}</View>
          </View>
        </View>
      </View>
    )
  }
}
export default Result
