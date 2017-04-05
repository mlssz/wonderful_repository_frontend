import { 
  amberA200, amberA400, amberA700,
  grey50, grey100, grey200, grey300, grey900,
  darkWhite
} from "material-ui/styles/colors"
import {fade} from "material-ui/utils/colorManipulator"
import Spacing from "material-ui/styles/spacing"

export default {
  spacing: Spacing,
  fontFamily: "Roboto, sans-serif",
  palette: {
   primary1Color: amberA400,
    primary2Color: amberA700,
    primary3Color: grey50,
    accent1Color: amberA200,
    accent2Color: grey100,
    accent3Color: grey200,
    textColor: darkWhite,
    alternateTextColor: darkWhite,
    canvasColor: grey900,
    borderColor: grey300,
    disabledColor: fade(darkWhite, 0.3),
    pickerHeaderColor: amberA400,
    clockCircleColor: fade(darkWhite, 0.07)
  }
}
