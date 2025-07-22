import { useEffect, useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Surface } from 'react-native-paper';
import axios from 'axios';
import AttendanceLogCard from '@/components/component/AttendenceLogCard';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const FILTERS = [
	'All',
	'Present',
	'Absent',
	'Late',
	'dfdd',
	'sdfd',
	'sdfsdf',
	'dfdf',
];

export default function DashboardScreen() {
	const [attendanceData, setAttendanceData] = useState(null);
	const [selectedFilter, setSelectedFilter] = useState('All');
const tabBarHeight = useBottomTabBarHeight();

	useEffect(() => {
		async function fetchAttendance() {
			try {
				const response = await axios.get(
					'http://192.168.68.120:3000/api/attendance/today/all'
				);
				setAttendanceData(response.data);
				console.log('response.data----------------------->', response.data);
			} catch (err) {
				console.error('Error fetching attendance:', err.message);
			}
		}
		fetchAttendance();
	}, []);

	if (!attendanceData) {
		return (
			<SafeAreaView className="flex-1 justify-center items-center bg-white">
				<Text className="text-lg font-semibold text-gray-600">
					⏳ Loading attendance...
				</Text>
			</SafeAreaView>
		);
	}

	const { totalUsers, totalPresent, totalAbsent, presentList, absentList } =
		attendanceData;

	const lateList = presentList.filter(user => user.isLate);
	const filteredData =
		selectedFilter === 'Present'
			? presentList
			: selectedFilter === 'Absent'
				? absentList
				: selectedFilter === 'Late'
					? lateList
					: [...presentList, ...absentList];


	return (
		<SafeAreaView
			style={{ paddingBottom: tabBarHeight + 40 }}
			className="flex-1 bg-white px-4 pt-4 "
		>
			{/* Header */}
			<View className="mb-3">
				<Text className="text-3xl font-bold text-gray-900 mb-2">
					📅 Today's Attendance
				</Text>
				<Text className="text-base text-gray-600">
					{new Date().toLocaleDateString('en-US', {
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
				</Text>
			</View>

			{/* Summary Cards */}
			<View className="flex-row justify-around mb-2 p-2 bg-orange-300 rounded-lg">
				{/* Present Card */}
				<View>
					<Text className="text-xl text-gray-800 font-extrabold">Present</Text>
					<Text className="text-2xl font-bold text-black text-center">
						{totalPresent}
					</Text>
				</View>

				{/* Absent Card */}
				<View>
					<Text className="text-xl text-gray-800 font-extrabold">Absent</Text>
					<Text className="text-2xl font-bold text-black text-center">
						{totalAbsent}
					</Text>
				</View>

				{/* Total Card */}
				<View>
					<Text className="text-xl text-gray-800 font-extrabold">Total</Text>
					<Text className="text-2xl font-bold text-black text-center">
						{totalUsers}
					</Text>
				</View>
			</View>

			{/* Filter Buttons */}

			<View className="h-12 mb-3">
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 8, alignItems: 'center' }}
				>
					{FILTERS.map(filter => (
						<TouchableOpacity
							key={filter}
							onPress={() => setSelectedFilter(filter)}
							className={`px-4 py-2 rounded-full mr-2 border ${
								selectedFilter === filter
									? 'bg-blue-600 border-blue-600'
									: 'bg-white border-gray-300'
							}`}
						>
							<Text
								className={`text-sm font-semibold ${
									selectedFilter === filter ? 'text-white' : 'text-gray-700'
								}`}
							>
								{filter}
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>

			{/* List */}

			<View className="  rounded">
				<FlatList
					data={filteredData}
					renderItem={item => <AttendanceLogCard item={item?.item} />}
					keyExtractor={item => item.userId}
					ListEmptyComponent={
						<View className="items-center py-10">
							<Text className="text-4xl mb-2">🤷‍♂️</Text>
							<Text className="text-gray-500 font-medium">
								No records found
							</Text>
						</View>
					}
					contentContainerStyle={{ paddingBottom: tabBarHeight }}
				/>
			</View>
		</SafeAreaView>
	);
}
