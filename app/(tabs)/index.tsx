// app/(tabs)/index.tsx
import { View, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-paper';

const todayLogs = [
	{ id: '1', name: 'John Smith', status: 'Present' },
	{ id: '2', name: 'Sarah Johnson', status: 'Present' },
];

const totalEmployees = 5;
const todayPresent = todayLogs.length;
const todayAbsent = totalEmployees - todayPresent;

export default function DashboardScreen() {
	return (
		<SafeAreaView className="flex-1 bg-white p-4">
			<Text className="text-xl font-bold mb-4">📊 Attendance Summary</Text>

			<Card style={{ marginBottom: 16 }}>
				<Card.Content>
					<Text>✅ Present: {todayPresent}</Text>
					<Text>❌ Absent: {todayAbsent}</Text>
					<Text>👥 Total: {totalEmployees}</Text>
				</Card.Content>
			</Card>

			<Text className="text-lg font-bold mb-2">🟢 Employees Present Today</Text>
			<FlatList
				data={todayLogs}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<Card style={{ marginBottom: 10 }}>
						<Card.Content>
							<Text>{item.name}</Text>
							<Text>Status: {item.status}</Text>
						</Card.Content>
					</Card>
				)}
			/>
		</SafeAreaView>
	);
}





