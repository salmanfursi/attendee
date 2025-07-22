import { View, Text, Image } from 'react-native';
import { Surface } from 'react-native-paper';

const AttendanceLogCard = ({ item }: any) => {
	console.log('item lateby----->', item.lateBy);

	const isAbsent = item.status === 'Absent';
	const isLate = item.isLate;

	return (
		<Surface
			className="mb-3 rounded-2xl bg-white shadow-sm border border-gray-100 "
			elevation={1}
		>
			<View className="p-4 flex-row items-center justify-between">
				<View className="flex-row items-center flex-1">
					<View
						className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${
							isAbsent
								? 'bg-gradient-to-br from-red-400 to-rose-500'
								: 'bg-gradient-to-br from-green-400 to-emerald-500'
						}`}
					>
						<Image
							source={require('../../assets/images/icon.png')}
							className="w-14 h-14 rounded-full"
						/>
					</View>
					<View className="flex-1">
						<Text
							className={`text-lg font-semibold mb-1 ${
								isAbsent ? 'text-red-700' : 'text-gray-800'
							}`}
						>
							{item.name}
						</Text>
						{item.lateBy ? (
							<Text className="text-sm text-gray-600">🕒 {item.lateBy}</Text>
						) : (
							<Text className="text-sm text-red-500">Absents</Text>
						)}
					</View>
				</View>
				<View
					className={`px-3 py-1.5 rounded-full ${
						isAbsent ? 'bg-red-200' : isLate ? 'bg-orange-100' : 'bg-green-100'
					}`}
				>
					<Text>{item.lateBy ? item.lateBy : 'Absent'}</Text>
				</View>
			</View>
		</Surface>
	);
};
export default AttendanceLogCard;
