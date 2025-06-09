import LogoutButton from "@/components/LogoutButton";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function ProfileScreen(){
  return (
    <SafeAreaView>
      <Text>Page Profile</Text>

      <LogoutButton/>
    </SafeAreaView>
  );}