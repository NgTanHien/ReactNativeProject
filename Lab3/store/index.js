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
      console.error("❌ Action not found:", action.type);
      return state; // Trả về state hiện tại nếu không có action phù hợp
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

const login = (dispatch, email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      USERS.doc(email).onSnapshot((u) => {
        if (u.exists) {
          dispatch({ type: "USER_LOGIN", value: u.data() });
        } else {
          Alert.alert("User profile not found in Firestore");
        }
      });
    })
    .catch((e) => {
      console.error("❌ Firebase login error:", e);
      Alert.alert("Sai email hoặc mật khẩu");
    });
};

const logout = (dispatch) => {
  auth()
    .signOut()
    .then(() => dispatch({ type: "LOGOUT" }))
    .catch((e) => console.error("❌ Logout error:", e));
};

export {
  MyContextControllerProvider,
  useMyContextController,
  login,
  logout,
};
