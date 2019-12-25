import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux'
import { View, Button } from '@tarojs/components';
import './index.less';

interface QuestionProps {
  questionData: any,
  type: string,
  dispatch: any,
  isLastQuestion: boolean
}

interface keyValueData {
  [key: string]: any
}

const titleMap: keyValueData = {
  privity: '默契大作战',
  charm: '魅力值测试',
  safe: '安全感测试',
  anxiety: '焦虑测试'
}

@connect(({ question }) => ({
  ...question,
  questionData: question.questionData,
  type: question.type,
  isLastQuestion: question.isLastQuestion
}))
class Question extends Component<QuestionProps> {
  
  config: Config= {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#409EFF',
    navigationBarTitleText: titleMap[Taro.getStorageSync('testType')],
    navigationBarTextStyle: 'white'
  }

  state = {
    selectItem: '',
    showModal: false
  }

  componentWillMount () {
    const { dispatch } = this.props
    console.log(333)
    dispatch({
      type: 'question/getQuestionDataAction',
      payload: {}
    })
  }

  next = () => {
    const { dispatch, questionData, isLastQuestion } = this.props
    const { selectItem } = this.state
    dispatch({
      type: 'question/updateQuestion',
      payload: {
        question: questionData,
        selectItem: selectItem
      }
    })
    if (isLastQuestion) {
      dispatch({
        type: 'question/submitTestQuestionAction',
        payload: {}
      })
      .then((res: any) => {
        if (res.resultCode === 200) {
          Taro.navigateTo({
            url: '/pages/test/result/index?testId=' + res.data.testId
          })
        } else {
          Taro.showToast({
            title: '测试失败,请重试！！！',
            icon: 'none',
            duration: 2000
          })
        }
      })
      .catch((err: any) => {
        Taro.showToast({
          title: '测试失败,请重试！！！',
          icon: 'none',
          duration: 2000
        })
      })
    } else {
      this.setState({
        selectItem: ''
      })
    }
  }

  render () {
    const { questionData, isLastQuestion } = this.props
    const { selectItem } = this.state
    return (
      <View className="question-content">
        <View className="content">
          <View className="top"></View>
          <View className="question-content">
            <View className="question">{questionData.question ? questionData.question : ''}</View>
            <View className="question-tip">选出最符合你的答案</View>
          </View>
        </View>
        <View className="select-content">
          <View className="select-item" onClick={() => {this.setState({selectItem: 'A'})}}>
            <View className="select-item-content">{questionData.selectionA ? questionData.selectionA : ''}</View>
            <View className={selectItem === 'A' ? "select-item-tag select-item-tag-select2" : "select-item-tag select-item-tag-select1"}>A</View>
          </View>
          <View className="select-item" onClick={() => {this.setState({selectItem: 'B'})}}>
            <View className="select-item-content">{questionData.selectionB ? questionData.selectionB : ''}</View>
            <View className={selectItem === 'B' ? "select-item-tag select-item-tag-select2" : "select-item-tag select-item-tag-select1"}>B</View>
          </View>
          <View className="select-item" onClick={() => {this.setState({selectItem: 'C'})}}>
            <View className="select-item-content">{questionData.selectionC ? questionData.selectionC : ''}</View>
            <View className={selectItem === 'C' ? "select-item-tag select-item-tag-select2" : "select-item-tag select-item-tag-select1"}>C</View>
          </View>
          <View className="select-item" onClick={() => {this.setState({selectItem: 'D'})}}>
            <View className="select-item-content">{questionData.selectionD ? questionData.selectionD : ''}</View>
            <View className={selectItem === 'D' ? "select-item-tag select-item-tag-select2" : "select-item-tag select-item-tag-select1"}>D</View>
          </View>
          <View className="select-item" onClick={() => {this.setState({selectItem: 'E'})}}>
            <View className="select-item-content">{questionData.selectionE ? questionData.selectionE : ''}</View>
            <View className={selectItem === 'E' ? "select-item-tag select-item-tag-select2" : "select-item-tag select-item-tag-select1"}>E</View>
          </View>
        </View>
        <View className="btn-content">
          <Button type="primary" size="default" disabled={selectItem === ''} onClick={this.next}>{isLastQuestion ? '测试结果' : '下一题' }</Button>
        </View>
      </View>
    )
  }
}

export default Question;