import * as React from "react"
import { Dimensions, TextInput, View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { CustomButtonOutLine } from "../custom-button/custom-button"

export interface CustomSearchProps {
  /**
   * An optional style override useful for padding & margin.
   */
   onPress?
   value?
   onChangeText?
}

/**
 * Describe your component here
 */
export const CustomSearch = React.memo(observer(function CustomSearch(props: CustomSearchProps) {
  const {onPress, value, onChangeText} = props

  return (
    <View style={styles.search}>
      <TextInput
        style={[styles.textInput, { width: width * 0.7 }]}
        placeholder="Search here..."
        placeholderTextColor="#F1EFDC"
        onChangeText={onChangeText}
        value={value}
      />
      <CustomButtonOutLine name="search-outline" onPress={onPress}/>
      <CustomButtonOutLine name="options" />
    </View>
  )
}))
const width = Dimensions.get("window").width

const styles = StyleSheet.create({
  search:{
    marginVertical: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
    alignItems: "center",
  },
  textInput: {
    marginLeft: 10,
    backgroundColor: "#565656",
    color: "#F1EFDC",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
})
