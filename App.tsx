import React, { useEffect } from "react";
import { MyContextControllerProvider } from "./Lab3/store";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./Lab3/routers/Router";
import { MenuProvider } from "react-native-popup-menu";

const App: React.FC = () => {
  const admin = {
    fullName: "admin",
    email: "nth04062003@gmail.com",
    password: "123456", 
    phone: "0916185659",
    address: "Bình Dương",
    role: "admin",
  };

  useEffect(() => {
    const checkAndCreateAdmin = async () => {
      console.log("🔍 Checking admin account...");

      try {
        // 1. Đăng nhập bằng email & password
        const userCredential = await auth().signInWithEmailAndPassword(
          admin.email.trim(),
          admin.password
        );

        const user = userCredential.user;
        if (!user) {
          console.warn("⚠️ No user returned after sign-in.");
          return;
        }

        const uid = user.uid;
        const userDoc = await firestore().collection("USERS").doc(uid).get();

        if (!userDoc.exists) {
          // 2. Nếu chưa có trong Firestore thì tạo
          await firestore().collection("USERS").doc(uid).set({
            ...admin,
            uid,
          });
          console.log("✅ Admin info added to Firestore");
        } else {
          console.log("✅ Admin already exists in Firestore");
        }
      } catch (error: any) {
        console.warn("⚠️ Sign-in failed:", error.code);

        // 3. Nếu không đăng nhập được → tạo mới
        try {
          const userCredential = await auth().createUserWithEmailAndPassword(
            admin.email.trim(),
            admin.password
          );

          const uid = userCredential.user.uid;

          await firestore().collection("USERS").doc(uid).set({
            ...admin,
            uid,
          });

          console.log("✅ Admin account created and saved to Firestore");
        } catch (creationError: any) {
          console.error("❌ Error creating admin:", creationError.code, creationError.message);
        }
      }
    };

    checkAndCreateAdmin();
  }, []);

  return (
    <MenuProvider>
      <MyContextControllerProvider>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </MyContextControllerProvider>
    </MenuProvider>
  );
};

export default App;
