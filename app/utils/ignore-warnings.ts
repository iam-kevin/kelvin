/**
 * Ignore some yellowbox warnings. Some of these are for deprecated functions
 * that we haven't gotten around to replacing yet.
 */
import { YellowBox } from "react-native"

YellowBox.ignoreWarnings([
  "componentWillMount is deprecated",
  "componentWillReceiveProps is deprecated",
  "Require cycle:",
  "Warning: Failed prop type: Invalid prop `messages` of type `object` supplied to",
  "[mobx.array] Attempt to read an array index "
])
