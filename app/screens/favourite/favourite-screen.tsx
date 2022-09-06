import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, StyleSheet, Text } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { CustomButton, CustomButtonOutLine, CustomFavouriteList, Screen } from "../../components"
import { useRoute } from "@react-navigation/native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `favourite: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="favourite" component={FavouriteScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const FavouriteScreen: FC<StackScreenProps<NavigatorParamList, "favourite">> = observer(
  function FavouriteScreen({ navigation }) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    const route = useRoute()
    const favoriteList = route.params
    const onPressBack = () => {
      navigation.goBack()
      console.log(favoriteList);
      
    }
    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={styles.root} preset="fixed">
        <View style={styles.header}>
          <CustomButton name={"arrow-left"} size={34} onPress={onPressBack} />
          <Text style={styles.titleText}>Your favourites</Text>
          <CustomButtonOutLine
            name={"cart-outline"}
            onPress={function (): void {
              throw new Error("Function not implemented.")
            }}
          />
        </View>
        <CustomFavouriteList data={favoriteList} />
        <View style={{ height: 50 }}></View>
      </Screen>
    )
  },
)
const styles = StyleSheet.create({
  root: {
    backgroundColor: "#364042",
    flex: 1,
  },
  header: {
    // position: "absolute",
    // top: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
  titleText: {
    color: "#f09408",
    fontSize: 24,
    fontWeight: "bold",
  },
  logo: {
    color: "white",
    fontSize: 50,
    marginHorizontal: 10,
  },
  searchAndCart: {
    flexDirection: "row",
  },
})
