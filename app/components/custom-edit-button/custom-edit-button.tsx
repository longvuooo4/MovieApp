import * as React from "react"
import { StyleSheet, TouchableOpacity, Text } from "react-native"
import { observer } from "mobx-react-lite"


export interface CustomEditButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  name: string,
  onPress?: () => void,
}

/**
 * Describe your component here
 */
export const CustomEditButton = React.memo(observer(function CustomEditButton(props: CustomEditButtonProps) {
  const { name, onPress } = props

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  )
}))

const styles = StyleSheet.create({
  name: {
    color: "#f09408",
  }
})
