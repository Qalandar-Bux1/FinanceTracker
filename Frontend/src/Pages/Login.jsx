import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import Dashboard from "./Dashboard";
const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/users/login",
      values
    );
    localStorage.setItem("studentToken", res.data.token);
    navigate("/dashboard");
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Sign In to Your Account
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col items-center">
              <div className="w-full max-w-xs space-y-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage 
                    name="email" 
                    component="div" 
                    className="text-red-500 text-xs mt-1 text-left w-full" 
                  />
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage 
                    name="password" 
                    component="div" 
                    className="text-red-500 text-xs mt-1 text-left w-full" 
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"

                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </div>

              <p className="text-center text-sm text-gray-600 mt-6">
                Don't have an account?{" "}
                <Link 
                  to="/signup" 
                  className="text-blue-600 font-medium hover:underline"
                >
                  Signup
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;