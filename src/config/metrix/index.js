import { Dimensions, PixelRatio, Platform } from "react-native"
import { isIphoneX } from "./isIPhoneX";
let { height, width } = Dimensions.get("window")

height -= Platform.OS == "ios" ? isIphoneX() ? 70 : 20 : 24;

const scale = height / 812

const VerticalSize = (size = 812) => (size / 812) * height;
const HorizontalSize = (size = 375) => (size / 375) * width;

const normalize = (size) => {
    const newSize = size * scale
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

export default {
    Radius: VerticalSize(10),
    LightRadius: VerticalSize(6),
    ActiveOpacity: 0.5,
    customFontSize: normalize,
    FontRegular: normalize(16),
    FontExtraSmall: normalize(12),
    FontSmall: normalize(14),
    FontMedium: normalize(18),
    FontLarge: normalize(22),
    VerticalSize,
    HorizontalSize
}