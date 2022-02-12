import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MyMapView from './components/MyMapView';
import { generateRandomLat, generateRandomLong } from './utils';

export default function App() {
  return (
    <View style={styles.container}>
      <MyMapView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
