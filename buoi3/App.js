import React, { useState } from "react";


const Login = ()=>{
  const [email, setEmail] = useState("tanhien@gmail.com");
  const [password, setPassword] = useState("hien@123")
  const [showPassword, setShowPassword] = useState(false);
  const checkEmail = ()=>{
    return !email.includes('@');
  }
}