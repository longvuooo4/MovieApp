import * as React from "react"
import { TextInput, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { typography } from "../../theme"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  backgroundColor: "white",
  width: "100%",
  borderColor: "#e8e8e8",
  borderWidth: 1,
  borderRadius: 5,
  paddingHorizontal: 10,
  marginVertical: 5,
}

const INPUT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: 'black',
}

export interface CustomInputProps {
  /**
   * An optional style override useful for padding & margin.
   */
  value: string
  setValue?
  placeholder: string
  secureTextEntry?: boolean
}

/**
 * Describe your component here
 */
export const CustomInput = observer(function CustomInput(props: CustomInputProps) {
  const { value, setValue, placeholder, secureTextEntry } = props

  return (
    <View style={CONTAINER}>
      <TextInput 
      placeholder={placeholder} 
      style={INPUT} 
      value={value} 
      onChangeText={setValue} 
      secureTextEntry={secureTextEntry}
      />
    </View>
  )
})
