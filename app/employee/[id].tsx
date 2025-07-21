// app/employee/[id].tsx
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button } from 'react-native-paper';
import { useLayoutEffect, useState } from 'react';

const mockLogs = {
	January: [
		{ date: '2025-01-03', status: 'Present' },
		{ date: '2025-01-04', status: 'Absent' },
	],
	February: [
		{ date: '2025-02-01', status: 'Present' },
		{ date: '2025-02-02', status: 'Present' },
	],
};
const months = Object.keys(mockLogs);

export default function EmployeeDetails() {
    const navigation = useNavigation();
    useLayoutEffect(() => {
			navigation.setOptions({
                title: 'employe profile',
				headerStyle: { backgroundColor: '#fff' },
				headerTintColor: '#000',
			});
		}, []);

	const { id } = useLocalSearchParams();
	const [selectedMonth, setSelectedMonth] = useState('January');

	return (
		<SafeAreaView className="flex-1 bg-white p-4">
			<Text className="text-xl font-bold mb-4">📅 Attendance Logs</Text>

			<View className="flex-row flex-wrap gap-2 mb-4">
				{months.map(month => (
					<Button
						key={month}
						mode={month === selectedMonth ? 'contained' : 'outlined'}
						onPress={() => setSelectedMonth(month)}
					>
						{month}
					</Button>
				))}
			</View>

			<FlatList
				data={mockLogs[selectedMonth]}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<Card style={{ marginBottom: 10 }}>
						<Card.Content>
							<Text>Date: {item.date}</Text>
							<Text>Status: {item.status}</Text>
						</Card.Content>
					</Card>
				)}
			/>
		</SafeAreaView>
	);
}
