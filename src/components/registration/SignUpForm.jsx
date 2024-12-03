import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    const handleTogglePassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-4 text-center text-[#F9751D]">
                    Register
                </h2>

                {/* Username Field */}
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        {...register("username", { required: true })}
                        id="username"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9751D]"
                        placeholder="Enter your username"
                    />
                    {errors.username && <span className="text-[#F9751D]">Username is required</span>}
                </div>

                {/* Email Field */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        id="email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9751D]"
                        placeholder="Enter your email"
                    />
                    {errors.email && <span className="text-[#F9751D]">Email is required</span>}
                </div>

                {/* Password Field */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            {...register("password", { required: true })}
                            id="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9751D]"
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                            onClick={handleTogglePassword}
                            aria-label={passwordVisible ? "Hide password" : "Show password"}
                        >
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {errors.password && <span className="text-[#F9751D]">Password is required</span>}
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-[#F9751D] text-white py-2 px-4 rounded-lg hover:bg-[#f86400] focus:outline-none focus:ring-2 focus:ring-[#F9751D]"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
