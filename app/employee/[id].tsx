
import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Divider } from 'react-native-paper';
import axios from 'axios';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { format, parseISO } from 'date-fns';

export default function MonthlyAttendance() {
	const { userId } = useLocalSearchParams(); // e.g., ?userId=10010
	const [data, setData] = useState<any>(null);
	const navigation = useNavigation(); // ✅ Access header options

	useEffect(() => {
		const fetchData = async () => {
			if (!userId) return;
			try {
				const res = await axios.get(
					`http://192.168.68.120:3000/api/attendance/monthly/${userId}?month=7&year=2025`
				);
				setData(res.data);

				// ✅ Set the dynamic title after fetching name
				navigation.setOptions({
					title: `${res.data.name}`,
					headerStyle: { backgroundColor: '#fff' },
					headerTintColor: '#000',
					headerTitleStyle: { fontWeight: 'bold' },
				});
			} catch (err: any) {
				console.error('API error:', err.message);
			}
		};

		fetchData();
	}, [userId]);

	const renderItem = ({ item }: { item: any }) => {
		const status = item.absent ? 'Absent' : 'Present';
		const statusColor = item.absent ? 'text-red-500' : 'text-green-600';
		const checkIn = item.checkIn
			? format(parseISO(item.checkIn), 'hh:mm a')
			: '--';
		const checkOut = item.checkOut
			? format(parseISO(item.checkOut), 'hh:mm a')
			: '--';

		return (
			<Card className="mb-2">
				<Card.Content className="flex-row justify-between items-center">
					<View>
						<Text className="text-base font-medium">
							{format(new Date(item.date), 'MMM dd, yyyy')}
						</Text>
						<Text className="text-xs text-gray-500">
							Check-in: {checkIn} | Check-out: {checkOut}
						</Text>
					</View>
					<Text className={`font-bold ${statusColor}`}>{status}</Text>
				</Card.Content>
			</Card>
		);
	};

	if (!data) {
		return (
			<SafeAreaView className="flex-1 justify-center items-center bg-white">
				<Text className="text-gray-500">Loading attendance...</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView className="flex-1 bg-white p-4">
			<Text className="text-xl font-bold mb-1">
				📆 {data.name}'s Attendance — July 2025
			</Text>
			<View className="flex-row justify-between mb-3 mt-1">
				<Text className="text-sm">Total: {data.totalDays} Days</Text>
				<Text className="text-sm text-green-600">
					Present: {data.totalPresent}
				</Text>
				<Text className="text-sm text-red-500">Absent: {data.totalAbsent}</Text>
			</View>

			<Divider className="mb-4" />

			<FlatList
				data={data.attendance}
				keyExtractor={item => item.date}
				renderItem={renderItem}
			/>
		</SafeAreaView>
	);
}
