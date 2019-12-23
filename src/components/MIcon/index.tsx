import Taro from '@tarojs/taro';
import { Text } from '@tarojs/components'

interface IconProps {
  type: string;
  className?: string;
  onClick?: () => void;
}

const mIcon = (props: IconProps) => {
  const { type, className, onClick } = props
  const onIconClick = () => {
    onClick&&onClick()
  }
  return <Text className={`bbqIconFont bbq-${type} ${className}`} onClick={onIconClick}/>
}
export default mIcon;