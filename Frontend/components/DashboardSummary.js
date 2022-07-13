import React from "react";
import { ScrollView, Text } from "react-native";
import Card from "./Card"
export default function DashboardSummary({styles, memberCount, sundayAttendanceCount}) {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			bounces
			style={{
				paddingVertical: 10,
			}}
		>
			<Card
				styles={{
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text
					style={[
						styles.textBold,
						{
							fontSize: 25,
							paddingBottom: 10,
							color: "#333",
						},
					]}
				>
					{memberCount}
				</Text>
				<Text
					style={[
						styles.textBold,
						{
							fontSize: 16,
							textAlign: "center",
							color: "#333",
						},
					]}
				>
					Total Number Of People You Have
				</Text>
			</Card>
			<Card
				styles={{
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text
					style={[
						styles.textBold,
						{
							fontSize: 25,
							paddingBottom: 10,
							color: "#333",
						},
					]}
				>
					{sundayAttendanceCount}
				</Text>
				<Text
					style={[
						styles.textBold,
						{
							fontSize: 16,
							textAlign: "center",
							color: "#333",
						},
					]}
				>
					Last Sunday's Attendance
				</Text>
			</Card>
			<Card
				styles={{
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text
					style={[
						styles.textBold,
						{
							fontSize: 25,
							paddingBottom: 10,
							color: "#333",
						},
					]}
				>
					20
				</Text>
				<Text
					style={[
						styles.textBold,
						{
							fontSize: 16,
							textAlign: "center",
							color: "#333",
						},
					]}
				>
					Bacenta Meeting's Attendance
				</Text>
			</Card>
		</ScrollView>
	);
}
