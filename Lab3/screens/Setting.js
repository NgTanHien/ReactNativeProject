import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useMyContextController } from "../store";

const Setting = () => {
  const navigation = useNavigation();
  const [controller] = useMyContextController();
  const { userLogin } = controller;
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  React.useEffect(() => {
    if (userLogin) {
      setUserData({
        name: userLogin.fullName || '',
        email: userLogin.email || '',
        phone: userLogin.phone || '',
      });
    }
  }, [userLogin]);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleUpdateProfile = () => {
    // Add your profile update logic here
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully');
  };

  const handleChangePassword = () => {
    if (!passwordData.currentPassword) {
      Alert.alert('Lỗi', 'Vui lòng nhập mật khẩu hiện tại');
      return;
    }
    if (!passwordData.newPassword) {
      Alert.alert('Lỗi', 'Vui lòng nhập mật khẩu mới');
      return;
    }
    if (!passwordData.confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng xác nhận mật khẩu mới');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return;
    }
    // Add your password change logic here
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    Alert.alert('Thành công', 'Đổi mật khẩu thành công');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{userLogin?.fullName || userLogin?.name || 'Tài khoản'}</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin tài khoản</Text>
          <View style={styles.profileCard}>
            {isEditing ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Tên tài khoản"
                  value={userData.name}
                  onChangeText={(text) => setUserData({ ...userData, name: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={userData.email}
                  onChangeText={(text) => setUserData({ ...userData, email: text })}
                  keyboardType="email-address"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Số điện thoại"
                  value={userData.phone}
                  onChangeText={(text) => setUserData({ ...userData, phone: text })}
                  keyboardType="phone-pad"
                />
                <TouchableOpacity
                  style={[styles.button, styles.saveButton]}
                  onPress={handleUpdateProfile}
                >
                  <Text style={styles.buttonText}>Lưu thay đổi</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Tên tài khoản:</Text>
                  <Text style={styles.value}>{userData.name}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Email:</Text>
                  <Text style={styles.value}>{userData.email}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Số điện thoại:</Text>
                  <Text style={styles.value}>{userData.phone}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.button, styles.pinkButton]}
                  onPress={() => setIsEditing(true)}
                >
                  <Text style={styles.buttonText}>Chỉnh sửa thông tin</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Đổi mật khẩu</Text>
          <View style={styles.profileCard}>
          {isChangingPassword ? (
  <>
    <TextInput
      style={[styles.input, { color: 'black' }]}
      placeholder="Nhập mật khẩu hiện tại"
      placeholderTextColor="#999"
      secureTextEntry={false}
      value={passwordData.currentPassword}
      onChangeText={(text) => setPasswordData({ ...passwordData, currentPassword: text })}
    />
    <TextInput
      style={[styles.input, { color: 'black' }]}
      placeholder="Nhập mật khẩu mới"
      placeholderTextColor="#999"
      secureTextEntry={false}
      value={passwordData.newPassword}
      onChangeText={(text) => setPasswordData({ ...passwordData, newPassword: text })}
    />
    <TextInput
      style={[styles.input, { color: 'black' }]}
      placeholder="Xác nhận mật khẩu mới"
      placeholderTextColor="#999"
      secureTextEntry={false}
      value={passwordData.confirmPassword}
      onChangeText={(text) => setPasswordData({ ...passwordData, confirmPassword: text })}
    />
    <TouchableOpacity
      style={[styles.button, styles.pinkButton]}
      onPress={handleChangePassword}
    >
      <Text style={styles.buttonText}>Đổi mật khẩu</Text>
    </TouchableOpacity>
  </>
) : (
  <TouchableOpacity
    style={[styles.button, styles.pinkButton]}
    onPress={() => setIsChangingPassword(true)}
  >
    <Text style={styles.buttonText}>Đổi mật khẩu</Text>
  </TouchableOpacity>
)}

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#e57373',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  label: {
    width: 80,
    fontSize: 16,
    color: '#666',
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#e57373',
  },
  pinkButton: {
    backgroundColor: '#e57373',
  },
  saveButton: {
    backgroundColor: '#e57373',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Setting; 