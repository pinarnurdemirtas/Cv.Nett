import React, { useState } from "react";
import UserLogin from "./UserLogin";
import AdminLogin from "./AdminLogin";

const LoginPage = () => {
  const [loginType, setLoginType] = useState(""); // Kullanıcı ya da admin girişini seçmek için

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Sayfanın üst kısmında ortalanmış başlık */}
      <h1 className="text-4xl font-bold text-gray-800 mb-16 text-center">
        Welcome to <span className="text-purple-600">Cv.Net</span> Application
      </h1>


      {/* Giriş türünü seçme */}
      {!loginType && (
        <div className="flex space-x-8">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-80 text-center transition-transform transform hover:scale-105">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">User Login</h2>
            <button
              onClick={() => setLoginType("user")}
              className="bg-purple-950 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition-all duration-300 w-full"
            >
              Go to User Login
            </button>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl w-80 text-center transition-transform transform hover:scale-105">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Admin Login</h2>
            <button
              onClick={() => setLoginType("admin")}
              className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-300 w-full"
            >
              Go to Admin Login
            </button>
          </div>
        </div>
      )}

      {/* Kullanıcı Giriş */}
      {loginType === "user" && <UserLogin />}

      {/* Admin Giriş */}
      {loginType === "admin" && <AdminLogin />}
    </div>
  );
};

export default LoginPage;
