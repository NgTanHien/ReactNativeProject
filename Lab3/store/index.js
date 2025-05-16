import { createContext, useReducer, useMemo, useContext } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";

const MyContext = createContext();
MyContext.displayName = "MyContext";

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

const MyContextControllerProvider = ({ children }) => {
  const initialState = {
    userLogin: null,
    services: [],
  };

  const [controller, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

const useMyContextController = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContextController must be used within a MyContextControllerProvider");
  }
  return context;
};

const USERS = firestore().collection("USERS");

// Hàm đăng nhập đã sửa
const login = async (dispatch, email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    const uid = userCredential.user.uid;

    const userDoc = await firestore().collection("USERS").doc(uid).get();
    if (userDoc.exists) {
      dispatch({ type: "USER_LOGIN", value: { ...userDoc.data(), uid } });
    } else {
      Alert.alert("Không tìm thấy thông tin người dùng trong Firestore.");
    }
  } catch (e) {
    console.error("Firebase login error:", e);
    Alert.alert("Đăng nhập thất bại", e.message || "Sai email hoặc mật khẩu");
  }
};


// Hàm đăng xuất
const logout = (dispatch) => {
  auth()
    .signOut()
    .then(() => dispatch({ type: "LOGOUT" }))
    .catch((e) => console.error("Logout error:", e));
};

export {
  MyContextControllerProvider,
  useMyContextController,
  login,
  logout,
};
