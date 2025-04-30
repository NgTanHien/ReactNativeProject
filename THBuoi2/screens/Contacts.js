import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { fetchContacts } from "../utility/api";
import ContactListItem from "../components/ContactListItem";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContactsLoading,
  fetchContactsSuccess,
  fetchContactsError,
} from "../screens/Store"

const keyExtractor = ({ phone }) => phone;

const Contacts = ({ navigation }) => {
  // ✅ Đảm bảo đọc đúng tên state
  const contacts = useSelector((state) => state.contacts.contacts);
  const loading = useSelector((state) => state.contacts.loading);
  const error = useSelector((state) => state.contacts.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsLoading());

    fetchContacts()
      .then((data) => {
        if (Array.isArray(data)) {
          dispatch(fetchContactsSuccess(data));
        } else {
          dispatch(fetchContactsError());
        }
      })
      .catch(() => {
        dispatch(fetchContactsError());
      });
  }, [dispatch]);

  const contactsSorted = contacts ? [...contacts].sort((a, b) => a.name.localeCompare(b.name)) : [];

  const renderContact = ({ item }) => {
    const { name, avatar, phone } = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate("Profile", { contact: item })}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color="blue" size="large" />}
      {error && (
        <Text style={styles.errorText}>
          There was an error loading contacts. Please try again later.
        </Text>
      )}
      {!loading && !error && contactsSorted.length > 0 && (
        <FlatList
          data={contactsSorted}
          keyExtractor={keyExtractor}
          renderItem={renderContact}
        />
      )}
      {!loading && !error && contactsSorted.length === 0 && (
        <Text style={styles.emptyText}>No contacts found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  emptyText: {
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Contacts;
