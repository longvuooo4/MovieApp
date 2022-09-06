import * as React from "react"
import { Text, View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"

export interface CustomDescriptionProps {
  /**
   * An optional style override useful for padding & margin.
   */
  data?
}

/**
 * Describe your component here
 */
export const CustomDescription = React.memo(observer(function CustomDescription(
  props: CustomDescriptionProps,
) {
  const { data } = props

  return (
    <View style={styles.root}>
      <Text style={styles.name}>{data.title}</Text>
      <Text style={styles.releaseAndContry}>Release date: {data.release_date}</Text>
      <Text style={styles.releaseAndContry}>Contry: {data.origin_country}</Text>
      <Text style={styles.overview}>{data.overview}</Text>
    </View>
  )
}))
const styles = StyleSheet.create({
  root: {
    margin: 20,
  },
  name: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  releaseAndContry: {
    fontSize: 14,
    color: "white",
    fontWeight: "200",
  },
  overview: {
    marginTop: 10,
    color: "white",
    fontSize: 14,
    lineHeight: 30,
  },
})
