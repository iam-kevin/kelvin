import * as React from "react"
import Svg, { Path } from "react-native-svg"

function InsertPhotoIcon(props) {
  return (
    <Svg height={24} viewBox="0 0 24 24" width={24} fill="#33A031" {...props}>
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
    </Svg>
  )
}

export default InsertPhotoIcon
