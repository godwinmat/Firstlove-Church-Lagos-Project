import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Ionicons} from "@expo/vector-icons"
import { NavIcon } from '../components/utility'

const Graph = ({navigation}) => {
  return (
    <SafeAreaView style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }}>
      <NavIcon
				name="menu-outline"
				size={33}
				onPress={() => navigation.toggleDrawer()}
			/>
      <Text>Graph</Text>
    </SafeAreaView>
  )
}

export default Graph