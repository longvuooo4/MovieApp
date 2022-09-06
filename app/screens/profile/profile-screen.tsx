import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { CustomButton, CustomEditButton, CustomInformation } from "../../components"
import Icon from "react-native-vector-icons/FontAwesome5"
import { firebase } from "@react-native-firebase/auth"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `profile: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="profile" component={ProfileScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ProfileScreen: FC<StackScreenProps<NavigatorParamList, "profile">> = observer(
  function ProfileScreen({ navigation }) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    
    const user = firebase.auth().currentUser
    const onPressedBack = () => {
      navigation.navigate("home")
    }
    const onPressedLogOut = () => {
      firebase.auth().signOut()
      navigation.navigate("signin")
    }
    const onPressedEdit = () => {
      navigation.navigate("editprofile")
    }
    
    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <ScrollView style={styles.root}>
        <View style={styles.header}>
          <CustomButton name={"arrow-left"} size={34} onPress={onPressedBack} />
          <View style={styles.title}>
            <Icon name="film" style={styles.logo} />
            <Text style={styles.titleText}>Movie</Text>
          </View>
          <TouchableOpacity onPress={onPressedLogOut}>
            <Text style={{color:"#f09408", padding: 5, fontSize:16}}>Log out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profile}>
          <Image source={require("./3075_Tank_T3_Thornmail.png")} style={styles.avatar}></Image>
          <Text style={styles.name}>{user.displayName}</Text>
          <CustomEditButton name="Edit Profile" onPress={onPressedEdit} />
        </View>
        <View style={styles.information}>
          <Text style={{ color: "#A07F5E", fontSize: 24, fontWeight: "bold" }}>
            Personal information
          </Text>
          <CustomInformation name="Email" value={user.email}/>
          <CustomInformation name="Number Phone" value={user.phoneNumber} />
          <CustomInformation name="Address"  />
        </View>
        <View style={{ height: 50 }}></View>
      </ScrollView>
    )
  },
)
const styles = StyleSheet.create({
  root: {
    backgroundColor: "#364042",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    color: "white",
    fontSize: 30,
  },
  logo: {
    color: "white",
    fontSize: 50,
    marginHorizontal: 10,
  },
  profile: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    margin: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  information: {
    margin: 10,
  },
})
