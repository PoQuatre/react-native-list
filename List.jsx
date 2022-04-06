import { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, Pressable } from "react-native";
import { ActivityIndicator } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "purple",
    marginHorizontal: 8,
    marginVertical: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  text: {
    color: "white",
  },
  country: {
    fontWeight: "bold",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 64,
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
    marginBottom: 16,
  },
  errorButton: {
    backgroundColor: "#777",
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
});

export const List = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState("An error occured while fetching data");
  const [loading, setLoading] = useState(false);

  const getCountries = (triesLeft = 3) => {
    setLoading(true);
    if (triesLeft > 0) {
      fetch("https://restcountries.com/v3.1/all")
        .then((res) => res.json())
        .then((res) =>
          res.map((country) => ({
            name: country.name.common,
            capital: country.capital,
          }))
        )
        .then((res) => res.sort((a, b) => a.name.localeCompare(b.name)))
        .then((res) => setCountries(res))
        .then(() => setError(""))
        .then(() => setLoading(false))
        .catch(() => getCountries(triesLeft - 1));
    } else {
      setLoading(false);
      setError("An error occured while fetching data");
    }
  };

  // useEffect(() => getCountries(), []);

  return loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="black" />
    </View>
  ) : error ? (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{error}</Text>
      <Pressable onPress={() => getCountries()}>
        <Text style={styles.errorButton}>Retry</Text>
      </Pressable>
    </View>
  ) : (
    <FlatList
      data={countries}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <Text style={[styles.text, styles.country]}>{item.name}</Text>
          <Text style={styles.text}>{item.capital}</Text>
        </View>
      )}
      keyExtractor={(_item, i) => i.toString()}
    />
  );
};
