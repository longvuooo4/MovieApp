import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { CustomButton, CustomInformation } from "../../components"
import { firebase } from "@react-native-firebase/auth"

// @ts-ignore
export const EditProfileScreen: FC<StackScreenProps<NavigatorParamList, "editProfile">> = observer(
  function EditProfileScreen({ navigation }) {
    const user = firebase.auth().currentUser
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const onPressedBack = () => {
      navigation.goBack()
    }
    const onPressedSave = async () => {
      const update = {
        displayName: name,
      }
      await user.updateProfile(update)
      navigation.navigate("profile")
    }

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <ScrollView style={styles.root}>
        <View style={styles.header}>
          <CustomButton name={"arrow-left"} size={34} onPress={onPressedBack} />
        </View>

        <View style={styles.profile}>
          <Text style={styles.name}>Edit Profile</Text>
        </View>
        <View style={styles.information}>
          <CustomInformation name="Name" value={name} editable={true} onChangeText={setName} />
          <CustomInformation
            name="Number Phone"
            value={phone}
            editable={true}
            onChangeText={setPhone}
          />
          <CustomInformation
            name="Address"
            editable={true}
            onChangeText={setAddress}
            value={address}
          />
        </View>
        <TouchableOpacity style={styles.save} onPress={onPressedSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
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
  save: {
    width: 100,
    height: 50,
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "black",
  },
  saveText: {
    margin: 7,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
  },
})
