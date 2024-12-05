import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/feature/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/feature/auth/authSlice";
import Swal from "sweetalert2";

const LoginForm = () => {
  const [isErrors, setIsError] = useState('')
  const [loginUser, { isLoading, isError, isSuccess }] = useLoginUserMutation();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      console.log(response)
      const { user} =response
      Swal.fire({
        title: `${response.msg}`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(setUser({user})) 
      window.location.href = "/";

    } catch (error) {
      console.log(error);
      setIsError(error.response)
      Swal.fire({
        title: 'Error',
        text: `${error.data.message}`,
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      })
    }

  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9751D] focus:border-transparent"
            />
          </div>
          {errors.email && <span className="text-[#F9751D] block mt-2 " >email required</span>}
          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              {...register("password", { required: true })}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9751D] focus:border-transparent"
            />
            {errors.password && <span className="text-[#F9751D] block mt-2 " >password required</span>}

          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-black bg-[#F9751D] rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#F9751D] focus:ring-offset-2"
          >
            Login
          </button>
        </form>
        {/* Additional Options */}
        <div className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to={"/sign-up"} className=" text-[#F9751D] hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;