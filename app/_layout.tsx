import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function Layout() {
  return (
    <View style={styles.root}> 
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
});
