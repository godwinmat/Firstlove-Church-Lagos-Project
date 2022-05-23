import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavIcon } from '../components/utility'

const List = ({navigation}) => {
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
      <Text>My List</Text>
    </SafeAreaView>
  )
}

export default List