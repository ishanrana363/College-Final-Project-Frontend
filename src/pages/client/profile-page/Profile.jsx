import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { baseUrl } from '../../../util/baseUrl';
import axios from 'axios';
import Spinner from '../../../components/loading-spinner/Spinner';
import { uploadImg } from '../../../upload-img/UploadImg';
import { updateAlert } from '../../../helper/loginAlert';
import Swal from 'sweetalert2';

const Profile = () => {
  const [loading, setLoading] = useState(false); // state to manage button loading state

  const getToken = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: getToken,
    },
  };

  const { data: userData = {}, refetch, isError, isLoading } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl()}/user-profile`, config);
      console.log(res.data.data)
      return res.data.data;
    }
  });

  let { profileImg: image } = userData;

  console.log("image is", image)

  if (isLoading) {
    return <div> <Spinner></Spinner> </div>
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const profileImg = e.target.profileImg.files[0];
    const bio = e.target.bio.value;
    const profassion = e.target.profassion.value;

    let upcommingImg = image;
    if (profileImg?.name) {
      upcommingImg = await uploadImg(profileImg);
    } else {
      upcommingImg = image;
    }

    console.log("upcommingImg is", upcommingImg)

    const payload = {
      username,
      email,
      profileImg: upcommingImg,
      bio,
      profassion,
    };

    console.log("payload is", payload)

    try {
      let resp = await updateAlert();
      if (resp.isConfirmed) {
        setLoading(true); // Set loading state to true when submitting
        let res = await axios.put(`${baseUrl()}/update-user`, payload, config);
        setLoading(false); // Set loading state to false after submission

        if (res) {
          Swal.fire({
            title: 'Profile updated successfully!',
            icon: 'success',
            confirmButtonText: 'Close',
          })
          refetch();
          return;
        }
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: `${error.response.data.message}`,
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      })
      setLoading(false); // In case of error, reset loading state
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">User Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='grid lg:grid-cols-2 gap-6'>
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                defaultValue={userData?.username}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={userData?.email}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Profile Image Field */}
            <div>
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src={userData?.profileImg} />
                </div>
              </div>
              <label htmlFor="profileImg" className="block mb-2 text-sm font-medium text-gray-700">Profile Image</label>
              <input
                type="file"
                id="profileImg"
                name="profileImg"
                className="w-full p-2 text-gray-600 bg-white border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-700"
              />
            </div>

            {/* Bio Field */}
            <div>
              <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-700">Bio</label>
              <textarea
                id="bio"
                name="bio"
                defaultValue={userData?.bio}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write a short bio about yourself"
                rows="4"
              ></textarea>
            </div>

            {/* Profession Field */}
            <div>
              <label htmlFor="profassion" className="block mb-2 text-sm font-medium text-gray-700">profassion</label>
              <input
                type="text"
                id="profassion"
                name="profassion"
                defaultValue={userData?.profassion}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="block mx-auto px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
            disabled={loading} // Disable button when loading
          >
            {loading ? <Spinner /> : 'Submit'} {/* Show loader if loading is true */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
