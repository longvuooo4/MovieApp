import * as React from "react"
import { View, StyleSheet, Text, TextInput, Dimensions } from "react-native"
import { observer } from "mobx-react-lite"

export interface CustomInformationProps {
  /**
   * An optional style override useful for padding & margin.
   */
  name: string
  value?: string
  editable?: boolean
  onChangeText?
} 

/**
 * Describe your component here
 */
export const CustomInformation = React.memo(observer(function CustomInformation(
  props: CustomInformationProps,
) {
  const { name, value, editable = false, onChangeText } = props

  return (
    <View style={styles.root}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.input}>
        <TextInput style={styles.textInput} editable={editable} value={value} onChangeText={onChangeText} />
      </View>
    </View>
  )
}))
const width = Dimensions.get("window").width

const styles = StyleSheet.create({
  root: {
    margin: 10,
    marginHorizontal: 20,
  },
  name: {
    fontSize: 16,
    color: "#f09408",
    marginBottom: 10,
  },
  input: {
    flexDirection: "row",
    alignItems: 'center',
  },
  textInput:{
    color: "#ffff",
    backgroundColor: "#686868",
    width: width * 0.8,
    borderRadius: 10,
    marginRight: 15
  },
})
