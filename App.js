import { SafeAreaView } from "react-native";
import Constants from "expo-constants";
import { List } from "./List";

export default function App() {
  return (
    <SafeAreaView
      style={{ paddingTop: Constants.statusBarHeight, minHeight: "100%" }}
    >
      <List />
    </SafeAreaView>
  );
}
