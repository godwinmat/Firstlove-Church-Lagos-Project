import {
	View,
	Text,
	Button,
	StatusBar,
	ActivityIndicator,
	Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logoutUser } from "../store/reducers/userReducers";
import { useNavigation } from "@react-navigation/native";
import { PTSans_400Regular, PTSans_700Bold } from "@expo-google-fonts/pt-sans";
import { Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { NavIcon } from "../components/utility";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const Dashboard = ({ navigation }) => {
	const user = useSelector((state) => state["users"]);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState({})

	async function prepare() {
		try {
			await SplashScreen.preventAutoHideAsync();
			await Font.loadAsync({
				Lato_400Regular,
				Lato_700Bold,
				PTSans_400Regular,
				PTSans_700Bold,
			});
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	async function fetchUserDetails() {
		const response = await dispatch(fetchUser(user.username)).unwrap();
	}

	useEffect(() => {
		prepare();
	}, []);

	useEffect(() => {
		fetchUserDetails();
	}, [user]);

	const onLayoutRootView = useCallback(async () => {
		if (!loading) {
			await SplashScreen.hideAsync();
		}
	}, [loading]);

	if (loading) return <ActivityIndicator size={"large"} animating={true} />;

	return (
		<SafeAreaView
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
			onLayout={onLayoutRootView}
		>
			<StatusBar
				barStyle="dark-content"
				backgroundColor={"white"}
				translucent
				animated
			/>
			<NavIcon
				name="menu-outline"
				size={33}
				onPress={() => navigation.toggleDrawer()}
			/>

			<View
				style={{
					position: "absolute",
					top: StatusBar.currentHeight + 5,
					right: 20,
					width: 40,
					height: 40,
					borderRadius: 20,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{user.image ? (
					<Image
						source={{ uri: user.image }}
						resizeMode="cover"
						style={{
							width: "100%",
							height: "100%",
							borderRadius: 20,
						}}
					/>
				): null}
			</View>
			<Text
				style={{
					fontFamily: "PTSans_400Regular",
				}}
			>
				Welcome {user.username}
			</Text>
		</SafeAreaView>
	);
};

export default Dashboard;
