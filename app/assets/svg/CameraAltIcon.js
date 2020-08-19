import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function CameraAltIcon(props) {
  return (
    <Svg height={24} viewBox="0 0 24 24" width={24} fill="#33A031" {...props}>
      <Path d="M0 0h24v24H0z" fill="none" />
      <Circle cx={12} cy={12} r={3.2} />
      <Path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
    </Svg>
  )
}

export default CameraAltIcon
