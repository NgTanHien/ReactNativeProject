import { createContext, useReducer, useMemo, useContext } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";

// Tạo context
const MyContext = createContext();
MyContext.displayName = "MyContext";

// Reducer để xử lý state
const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, userLogin: action.value };
    case "LOGOUT":
      return { ...state, userLogin: null };
    default:
      console.error("Action not found:", action.type);
      return state;
  }
};

// Provider để bao bọc toàn bộ app
const MyContextControllerProvider = ({ children }) => {
  const initialState = {
    userLogin: null,
    services: [],
  };

  const [controller, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

// Hook dùng để truy cập context
const useMyContextController = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContextController must be used within a MyContextControllerProvider");
  }
  return context;
};

// Firebase Firestore collection
const USERS = firestore().collection("USERS");

// Hàm login (đã tối ưu)
const login = async (dispatch, email, password) => {
  try {
    // Đăng nhập bằng Firebase Auth
    await auth().signInWithEmailAndPassword(email, password);

    // Lấy hồ sơ từ Firestore
    const userDoc = await USERS.doc(email).get();
    if (userDoc.exists) {
      dispatch({ type: "USER_LOGIN", value: userDoc.data() });
    } else {
      Alert.alert("Không tìm thấy thông tin người dùng trong Firestore");
    }
  } catch (e) {
    console.error("Firebase login error:", e);
    Alert.alert("Sai email hoặc mật khẩu");
  }
};

// Hàm logout
const logout = (dispatch) => {
  auth()
    .signOut()
    .then(() => {
      dispatch({ type: "LOGOUT" });
    })
    .catch((e) => {
      console.error("Logout error:", e);
      Alert.alert("Đăng xuất thất bại");
    });
};

// Export các thành phần
export {
  MyContextControllerProvider,
  useMyContextController,
  login,
  logout,
};
