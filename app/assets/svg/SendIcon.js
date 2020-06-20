import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SendIcon(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2 .01 7z" fill="#33A031" />
    </Svg>
  )
}

export default SendIcon
