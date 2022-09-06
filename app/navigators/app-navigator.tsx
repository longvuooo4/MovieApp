import React, { useEffect } from "react"
import { useColorScheme, View, Text } from "react-native"
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
  CategoryDetailsScreen,
  DetailsScreen,
  HomeScreen,
  ProfileScreen,
  SignInScreen,
  SignUpScreen,
} from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import Icon from "react-native-vector-icons/FontAwesome5"
import { FavouriteScreen } from "../screens/favourite/favourite-screen"
import { FilterScreen } from "../screens/filter/filter-screen"
import SplashScreen from "react-native-splash-screen"
import { useStores } from "../models"
import { EditProfileScreen } from "../screens/edit-profile/edit-profile-screen"

export type NavigatorParamList = {
  home: undefined
  filter: undefined
  details: undefined
  category: undefined
  favourite: undefined
  signin: undefined
  tab: undefined
  signup: undefined
  editprofile: undefined
  profile: undefined
  // 🔥 Your screens go here
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()
const Tab = createBottomTabNavigator()


const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"signin"}
    >
      <Stack.Screen name="signin" component={SignInScreen} />
      <Stack.Screen name="signup" component={SignUpScreen} />
      <Stack.Screen name="editprofile" component={EditProfileScreen} />
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="filter" component={FilterScreen} />
      <Stack.Screen name="details" component={DetailsScreen} />
      <Stack.Screen name="category" component={CategoryDetailsScreen} />
      <Stack.Screen name="favourite" component={FavouriteScreen} />
    </Stack.Navigator>
  )
}
const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "signin"
  if (routeName == "signin" || routeName == "details" || routeName == "category" || routeName == "signup" || routeName == "editprofile") {
    return "none"
  }
  return "flex"
}
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 10,
          right: 10,
          elevation: 10,
          backgroundColor: "#395B64",
          borderRadius: 20,
        },
      })}
    >
      <Tab.Screen
        name="mainstack"
        component={MainStack}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            position: "absolute",
            bottom: 0,
            left: 10,
            right: 10,
            elevation: 10,
            backgroundColor: "#395B64",
            borderRadius: 20,
          },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Icon
                name="home"
                style={{
                  fontSize: 20,
                  color: focused ? "#e32f45" : "#f09408",
                }}
              />
              <Text style={{ color: focused ? "#e32f45" : "#f09408", fontSize: 12 }}>Home</Text>
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="favourite"
        component={FavouriteScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Icon
                name="heart"
                style={{
                  fontSize: 20,
                  color: focused ? "#e32f45" : "#f09408",
                }}
              />
              <Text style={{ color: focused ? "#e32f45" : "#f09408", fontSize: 12 }}>
                Favourite
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="filter"
        component={FilterScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Icon
                name="filter"
                style={{
                  fontSize: 20,
                  color: focused ? "#e32f45" : "#f09408",
                }}
              />
              <Text style={{ color: focused ? "#e32f45" : "#f09408", fontSize: 12 }}>Filter</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Icon
                name="user"
                style={{
                  fontSize: 20,
                  color: focused ? "#e32f45" : "#f09408",
                }}
              />
              <Text style={{ color: focused ? "#e32f45" : "#f09408", fontSize: 12 }}>Profile</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}
interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  useBackButtonHandler(canExit)
  const { homeStore, genresStore } = useStores()
  const loadApp = async () => {
    await Promise.all([
      homeStore.getPopular(),
      homeStore.getMovies(),
      homeStore.getTopRate(),
      homeStore.getUpComing(),
      homeStore.getCategory(),
      genresStore.getGenres(),
    ])
  }
  useEffect(() => {
    loadApp()?.finally(SplashScreen.hide)
    return () => {}
  }, [])

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      {/* <AppStack /> */}
      <BottomTabNavigator />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
