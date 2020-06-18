import { TextInputProps, TextStyle, ViewStyle } from "react-native"

export interface CodeTextFieldProps extends TextInputProps {
  // The number of cells as input
  // default 4
  length?: number

  // input for the value
  value?: string

  // function handler for the onChangetext
  changeCodeAction?: React.Dispatch<React.SetStateAction<string>>

  /**
   * Various look & feels.
   */
  rootStyle?: "default"

  // Style for the cells of the code input
  cellStyle?: ViewStyle | ViewStyle[]

  // Style for the focused cell
  focusedCellStyle?: ViewStyle | ViewStyle[]
}
