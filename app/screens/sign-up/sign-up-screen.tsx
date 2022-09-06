import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, StyleSheet, Text } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { CustomInput, CustomLoginButton, CustomSocialButton, Screen } from "../../components"
import auth from "@react-native-firebase/auth"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"


// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `signUp: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="signUp" component={SignUpScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const SignUpScreen: FC<StackScreenProps<NavigatorParamList, "signUp">> = observer(
  function SignUpScreen({navigation}) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    // const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    useEffect(() => {
      const unsubcribe = auth().onAuthStateChanged((user) => {
        if (password === passwordRepeat && user) {
          Alert.alert("Register successful")
          navigation.navigate("signin")
        }
      })
      return unsubcribe
    }, [])
    const onRegisterPressed = () => {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log("Register with:" + user.email);
        })
        .catch((e) => {
          console.log('There has been a problem with your fetch operation: ' + e.message);
          });
      // navigation.navigate('confirmemail')
    }
    const onSignInPressed = () => {
      navigation.navigate('signin')
    }
    const onTermsOfUsePressed = () => {
      console.warn("onTermsOfUsePressed")
    }
    const onPrivacyPolicyPressed = () => {
      console.warn("onPrivacyPolicyPressed")
    }
    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={styles.root} preset="scroll">
        <Text style={styles.title}>Create an account</Text>
        {/* <CustomInput value={username} placeholder={"Username"} setValue={setUsername} /> */}
        <CustomInput value={email} placeholder={"Email"} setValue={setEmail} />
        <CustomInput
          value={password}
          placeholder={"Password"}
          setValue={setPassword}
          secureTextEntry
        />
        <CustomInput
          value={passwordRepeat}
          placeholder={"Repeat Password"}
          setValue={setPasswordRepeat}
          secureTextEntry
        />
        <CustomLoginButton text="Register" onPress={onRegisterPressed} />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{" "}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{" "}
          and{" "}
          <Text style={styles.link} onPress={onPrivacyPolicyPressed}>
            Privacy Policy
          </Text>
        </Text>
        <CustomSocialButton />
        <CustomLoginButton
          text="Have an account? Sign in"
          onPress={onSignInPressed}
          type="TERTIARY"
        />
      </Screen>
    )
  },
)

const styles = StyleSheet.create({
   root:  {
    backgroundColor: "#F9FBDC",
    alignItems: "center",
    padding: 20,
    flex: 1,
  },
   title:  {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
   text:  {
    color: "gray",
    marginVertical: 10,
  },
   link:  {
    color: "#FDB875",
  },
})