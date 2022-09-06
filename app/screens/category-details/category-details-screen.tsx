import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, Text, StyleSheet } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
// import { color } from "../../theme"
import { useStores } from "../../models"
import { Category, CustomButton, CustomButtonOutLine } from "../../components"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `categoryDetails: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="categoryDetails" component={CategoryDetailsScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const CategoryDetailsScreen: FC<StackScreenProps<NavigatorParamList, "categoryDetails">> =
  observer(function CategoryDetailsScreen({ navigation, route }) {
    const rootStore = useStores()
    const id= route.params
    const onPressBack = () => {
      navigation.replace("home")
    }
    const fetchCategory = () => {
      rootStore.homeStore.getCategory(id)
      nameCategory()
    }
    useEffect(() => {
      fetchCategory()
    }, [])
    const nameCategory = () => {
      let name = ""
      for (let i = 0; i < rootStore.genresStore.genres.length; i++) {
        if (id == rootStore.genresStore.genres[i].id) {
          name = rootStore.genresStore.genres[i].name
          
        }  
      }
      return name;
    }
    const onPressDetails = (idCategory) => {
      navigation.navigate("details", idCategory)
    }
    return (
      <View style={styles.root}>
        <View style={styles.header}>
          <CustomButton name={"arrow-left"} size={34} onPress={onPressBack} />
          <Text style={styles.titleText}>{nameCategory()}</Text>
          <CustomButtonOutLine
            name={"cart-outline"}
            onPress={function (): void {
              throw new Error("Function not implemented.")
            }}
          />
        </View>
        <Category data={rootStore.homeStore.category} onPress={onPressDetails} />
      </View>
    )
  })
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
