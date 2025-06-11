
import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/users/register`, {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <Field type="text" name="name" className="w-full border px-3 py-2 rounded" />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <Field type="email" name="email" className="w-full border px-3 py-2 rounded" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium">Password</label>
                <Field type="password" name="password" className="w-full border px-3 py-2 rounded" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium">Confirm Password</label>
                <Field type="password" name="confirmPassword" className="w-full border px-3 py-2 rounded" />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>

              <p className="text-center text-sm mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
