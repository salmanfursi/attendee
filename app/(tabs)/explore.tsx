// app/(tabs)/explore.tsx
import { FlatList, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-paper';

const employees = [
	{ id: '1', name: 'John Smith' },
	{ id: '2', name: 'Sarah Johnson' },
	{ id: '3', name: 'Alex Kim' },
];

export default function EmployeeListScreen() {
	const router = useRouter();

	return (
		<SafeAreaView className="flex-1 bg-white p-4">
			<Text className="text-xl font-bold mb-4">👥 All Employees</Text>
			<FlatList
				data={employees}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity onPress={() => router.push(`/employee/${item.id}`)}>
						<Card style={{ marginBottom: 12 }}>
							<Card.Content>
								<Text>{item.name}</Text>
							</Card.Content>
						</Card>
					</TouchableOpacity>
				)}
			/>
		</SafeAreaView>
	);
}




