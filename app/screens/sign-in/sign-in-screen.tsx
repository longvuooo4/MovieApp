import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, StyleSheet, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import auth from "@react-native-firebase/auth"
import { CustomInput, CustomLoginButton, CustomSocialButton } from "../../components"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

// @ts-ignore
export const SignInScreen: FC<StackScreenProps<NavigatorParamList, "signIn">> = observer(
  function SignInScreen({ navigation }) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    useEffect(() => {
      const unsubcribe = auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.navigate("home")
        }
      })
      return unsubcribe
    }, [])
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const onSignInPressed = () => {
      if (email == "" || password == "") {
        Alert.alert("Login failed","Please enter email and password")
      } else {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then((userCredentials) => {
            navigation.navigate("home")
            setEmail("")
            setPassword("")
          })
          .catch((e) => {
            Alert.alert("Login failed", "User account or password incorrect")
          })
      }
    }

    const onSignUpPressed = () => {
      navigation.navigate("signup")
    }

    return (
      <View style={styles.root}>
        <CustomInput value={email} placeholder={"Email"} setValue={setEmail} />
        <CustomInput
          value={password}
          placeholder={"Password"}
          setValue={setPassword}
          secureTextEntry
        />
        <CustomLoginButton text="Sign In" onPress={onSignInPressed} />
        <CustomLoginButton text="Forgot password" type="TERTIARY" />
        <CustomLoginButton
          text="Don't have an account? Create one"
          onPress={onSignUpPressed}
          type="TERTIARY"
        />
      </View>
    )
  },
)
const styles = StyleSheet.create({
  root: {
    backgroundColor: "#F9FBDC",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    flex: 1,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
})
