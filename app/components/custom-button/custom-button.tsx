import * as React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { color } from "../../theme"
// import { Text } from "../text/text"
import Icon from "react-native-vector-icons/FontAwesome5"
import Ionicons from "react-native-vector-icons/Ionicons"

export interface CustomButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  name: string
  size?: number
  onPress?: () => void
}

/**
 * Describe your component here
 */
export const CustomButton = React.memo(
  observer(function CustomButton(props: CustomButtonProps) {
    const { name, size = 30, onPress } = props
    // const styles = Object.assign({}, CONTAINER, style)

    return (
      <TouchableOpacity>
        <Icon name={name} style={[styles.icon, size ? { fontSize: size } : {}]} onPress={onPress} />
      </TouchableOpacity>
    )
  }),
)
export const CustomButtonOutLine = React.memo(
  observer(function CustomButton(props: CustomButtonProps) {
    const { name, size = 30, onPress } = props
    // const styles = Object.assign({}, CONTAINER, style)

    return (
      <TouchableOpacity>
        <Ionicons
          name={name}
          style={[styles.icon, size ? { fontSize: size } : {}]}
          onPress={onPress}
        />
      </TouchableOpacity>
    )
  }),
)

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 5,
    color: color.button,
  },
})
