import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';

export default function Signup() {
  const [dataExists, setDataExists] = useState(null);
  const [dataSuccess, setDataSuccess] = useState(null);
  const navigate = useNavigate();

  async function allData(data) {
    try {
      const dataSignUp = await axios.post('http://mohamed3333.runasp.net/api/Auth/register', data);
      console.log(dataSignUp);
      console.log(dataSignUp.data.message);
      setDataSuccess(dataSignUp.data.message);

      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      console.log('Error occurred:', err);
      const errorMessage = err.response?.data?.message || 'Registration failed.';
      console.log(errorMessage);
      setDataExists(errorMessage);
    }
  }

  const userData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const formikObj = useFormik({
    initialValues: userData,
    onSubmit: allData,
    validate: (values) => {
      const errors = {};

      if (values.name.length < 4 || values.name.length > 12) {
        errors.name = 'Name must be from 4 to 12 characters';
      }

      if (!values.email.includes('@') || !values.email.includes('.')) {
        errors.email = 'Invalid email';
      }

      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = 'Password must be from 6 to 12 characters';
      }

      if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords do not match';
      }

      return errors;
    }
  });

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center">
      <div className="container text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/2 max-w-md"
        >
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-navy-900 mb-2">Sign Up</h1>
          </div>

          {dataExists && <div className="alert alert-danger">{dataExists}</div>}
          {dataSuccess && <div className="alert alert-success">{dataSuccess}</div>}

          <form onSubmit={formikObj.handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={formikObj.values.name}
                onChange={formikObj.handleChange}
                onBlur={formikObj.handleBlur}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              />
              {formikObj.errors.name && formikObj.touched.name && (
                <div className="alert alert-danger mt-2">{formikObj.errors.name}</div>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formikObj.values.email}
                onChange={formikObj.handleChange}
                onBlur={formikObj.handleBlur}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              />
              {formikObj.errors.email && formikObj.touched.email && (
                <div className="alert alert-danger mt-2">{formikObj.errors.email}</div>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formikObj.values.password}
                onChange={formikObj.handleChange}
                onBlur={formikObj.handleBlur}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              />
              {formikObj.errors.password && formikObj.touched.password && (
                <div className="alert alert-danger mt-2">{formikObj.errors.password}</div>
              )}
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={formikObj.values.confirmPassword}
                onChange={formikObj.handleChange}
                onBlur={formikObj.handleBlur}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              />
              {formikObj.errors.confirmPassword && formikObj.touched.confirmPassword && (
                <div className="alert alert-danger mt-2">{formikObj.errors.confirmPassword}</div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-colors"
            >
              Sign Up Now!
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
