import React from "react";
import {
  SectionList,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
  },
  name: {
    fontSize: 16,
    color: "#333",
  },
  separator: {
    backgroundColor: "#e0e0e0",
    height: 1,
    marginHorizontal: 16,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f2f2f2",
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
  },
});

const groupPeopleByLastName = (_data) => {
  const data = [..._data];
  const groupedData = data.reduce((accumulator, item) => {
    const group = item.name.last[0].toUpperCase();
    if (accumulator[group]) {
      accumulator[group].data.push(item);
    } else {
      accumulator[group] = { title: group, data: [item] };
    }
    return accumulator;
  }, {});

  const sections = Object.keys(groupedData).map((key) => groupedData[key]);

  return sections.sort((a, b) => a.title.localeCompare(b.title));
};

const PEOPLE = [
  { name: { title: "Mr", first: "Johan", last: "Renard" } },
  { name: { title: "Mr", first: "Brand", last: "Van Meijl" } },
  { name: { title: "Mr", first: "Kasper", last: "Kivela" } },
  { name: { title: "Mr", first: "Harley", last: "Martin" } },
  { name: { title: "Mr", first: "Aapo", last: "Niemela" } },
  { name: { title: "Ms", first: "Carol", last: "Williams" } },
  { name: { title: "Ms", first: "تارا", last: "حسینی" } },
  { name: { title: "Ms", first: "محمدامین", last: "سهیلی راد" } },
  { name: { title: "Mr", first: "Mauritz", last: "Musch" } },
  { name: { title: "Ms", first: "Andrea", last: "Austin" } },
  { name: { title: "Mr", first: "Murat", last: "Kutlay" } },
  { name: { title: "Ms", first: "Nanneke", last: "Ermers" } },
  { name: { title: "Mr", first: "Jayden", last: "Anderson" } },
  { name: { title: "Ms", first: "Nejla", last: "Van Riet" } },
  { name: { title: "Ms", first: "Heather", last: "Hudson" } },
  { name: { title: "Ms", first: "Maria", last: "Wright" } },
  { name: { title: "Ms", first: "Edelmira", last: "Nogueira" } },
];

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <SectionList
        sections={groupPeopleByLastName(PEOPLE)}
        keyExtractor={(item) => `${item.name.first}-${item.name.last}`}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>
              {item.name.first} {item.name.last}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}
