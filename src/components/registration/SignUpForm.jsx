import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../redux/feature/auth/authApi";
import Swal from "sweetalert2";

const SignUpForm = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error,setError] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const navigate = useNavigate();

    
    const [registerUser,{ isError,isLoading,isSuccess }] = useRegisterUserMutation();
    
    const onSubmit = async (data) => {
        try {
            const response = await registerUser(data).unwrap();
            Swal.fire({
                title: "Registration Successful",
                text: `${response.msg}`,
                icon: "success",
                confirmButtonText: "Go to Login",
            });
            reset(); // Reset form fields after successful registration
            navigate("/login");
            console.log(response);
        } catch (error) {
            Swal.fire({
                title: "Registration Failed",
                text: `${error.data.message}`,
                icon: "error",
                confirmButtonText: "Try Again",
            });

            setError(error.message);
            console.log(error.data.message);
        }
    };
    const handleTogglePassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="w-11/12 mx-auto " >
            <div className="flex items-center justify-center min-h-screen ">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white p-6 border rounded-lg shadow-md w-full "
                >
                    <h2 className="text-2xl font-bold mb-4 text-center text-[#F9751D]">
                        Register
                    </h2>

                    <div className="grid grid-cols-2 gap-6 " >
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

                        {/* profileImg Field */}
                        <div className="mb-4">
                            <label htmlFor="profileImg" className="block text-gray-700 font-medium mb-2">
                                Profile Img Url
                            </label>
                            <input
                                type="url"
                                {...register("profileImg", { required: true })}
                                id="profileImg"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9751D]"
                                placeholder="Enter your profileImg"
                            />
                            {errors.profileImg && <span className="text-[#F9751D]">profileImg is required</span>}
                        </div>

                        {/* bio Field */}
                        <div className="mb-4">
                            <label htmlFor="bio" className="block text-gray-700 font-medium mb-2">
                                Bio
                            </label>
                            <input
                                type="text"
                                {...register("bio", { required: true })}
                                id="bio"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9751D]"
                                placeholder="Enter your bio 150 characters "
                            />
                            {errors.bio && <span className="text-[#F9751D]">Bio is required</span>}
                        </div>

                        {/* profassion Field */}
                        <div className="mb-4">
                            <label htmlFor="profassion" className="block text-gray-700 font-medium mb-2">
                                Profassion
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    {...register("profassion", { required: true })}
                                    id="profassion"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9751D]"
                                    placeholder="Enter your profassion"
                                />
                            </div>
                            {errors.profassion && <span className="text-[#F9751D]">Profassion is required</span>}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className=" block mx-auto bg-[#F9751D] text-white py-2 px-4 rounded-lg hover:bg-[#f86400] focus:outline-none focus:ring-2 focus:ring-[#F9751D]"
                        >
                            Register
                        </button>
                    </div>
                    <div className="text-sm text-center text-gray-600">
                        You have an account please login{" "}
                        <Link to={"/login"} className=" text-[#F9751D] hover:underline">
                            Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;
