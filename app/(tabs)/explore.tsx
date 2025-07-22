import { FlatList, TouchableOpacity, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Avatar } from 'react-native-paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

type User = {
	_id: string;
	name: string;
	uid: number;
	role: number;
	isActive: boolean;
};

export default function EmployeeListScreen() {
	const [userData, setUserData] = useState<User[]>([]);
	const router = useRouter();
	const bottomHight = useBottomTabBarHeight();
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get(
					'http://192.168.68.120:3000/api/users'
				);
				setUserData(response.data);
				// console.log('Fetched users:----->', response.data);
			} catch (err: any) {
				console.error('Error fetching users:', err.message);
			}
		};

		fetchUsers();
	}, []);

	const renderItem = ({ item }: { item: User }) => (
		<TouchableOpacity
			onPress={() => router.push(`/employee/employeedtail?userId=${item.userId}`)}
		>
			{/* <TouchableOpacity onPress={() => router.push(`/employee/monthly?userId=${item.userId}`)}> */}
			<Card className="mb-3">
				<Card.Content className="flex-row items-center gap-3">
					<Avatar.Text label={item.name.charAt(0)} size={40} />
					<View>
						<Text className="text-base font-semibold">{item.name}</Text>
						<Text className="text-xs text-gray-500">
							user id: {item.userId}
						</Text>
					</View>
				</Card.Content>
			</Card>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView className="flex-1 bg-white p-4">
			<Text className="text-xl font-bold mb-4">👥 All Employees</Text>

			{userData.length === 0 ? (
				<Text className="text-center text-gray-400 mt-10">
					Loading employees...
				</Text>
			) : (
				<FlatList
					data={userData}
					keyExtractor={item => item?.userId}
					renderItem={renderItem}
					contentContainerStyle={{ paddingBottom: bottomHight }}
				/>
			)}
		</SafeAreaView>
	);
}
