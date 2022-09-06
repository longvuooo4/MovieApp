import * as React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"


export interface CustomButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  onPress?: () => void
  text: string
  type?: string
  bgColor?: string
  fgColor?: string
}

/**
 * Describe your component here
 */
export const CustomLoginButton = observer(function CustomLoginButton(props: CustomButtonProps) {
  const { onPress, text, type = "PRIMARY", bgColor, fgColor } = props
  return (
    <TouchableOpacity
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, styles[`text_${type}`], fgColor ? { color: fgColor } : {}]}>
        {text}
      </Text>
    </TouchableOpacity>
  )
})
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  container_PRIMARY: {
    backgroundColor: "#3B71F3",
  },
  container_SECONDARY: {
    borderColor: "#3B71F3",
    borderWidth: 2,
  },
  container_TERTIARY: {},
  text: {
    fontWeight: "bold",
    color: "white",
  },
  text_TERTIARY: {
    color: "gray",
  },
  text_SECONDARY: {
    color: "#3B71F3",
  },
})
