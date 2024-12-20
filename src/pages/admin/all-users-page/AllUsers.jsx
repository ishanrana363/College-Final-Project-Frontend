import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEdit, FaTrash } from "react-icons/fa";
import { baseUrl } from "../../../util/baseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import { deleteAlert } from "../../../helper/deleteAlert";

const UserTableWithModal = () => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: getToken,
    },
  };

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl()}/all-users`, config);
      return res.data.data;
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = (user) => {
    setCurrentUser(user);
    setSelectedStatus(user.status);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSave = async (id) => {
    const res = await axios.put(`${baseUrl()}/update-role/${id}`, { role: selectedStatus }, config);
    if (res) {
      Swal.fire({
        title: 'Role updated successfully!',
        icon: 'success',
        confirmButtonText: 'Close',
      });
    }
    setIsModalOpen(false);
    refetch();
  };

  const handleDelete = async (id) => {
    try {
      const resp = await deleteAlert();
      if (resp.isConfirmed) {
        let res = await axios.delete(`${baseUrl()}/delete-user/${id}`, config);
        if (res) {
          Swal.fire({
            title: 'User deleted successfully!',
            icon: 'success',
            confirmButtonText: 'Close',
          });
        }
        refetch();
      }
    } catch (error) {
      Swal.fire({
        title: 'Error deleting user',
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  };

  const filteredUsers = users.filter((user) =>
    (user.username?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (user.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (user.profassion?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (user.role?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  return (
    <div className="">
      <Helmet>
        <title>Dashboard | Manage Users</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-5">Manage Users</h1>

      {/* Search Bar */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by username, email, profession, or role"
          className="px-4 py-2 border border-gray-300 rounded-md w-1/2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="ml-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
          onClick={() => setSearchQuery("")}
        >
          Clear
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="table-auto w-full table-collapse text-[12px]">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Profile Image</th>
              <th className="border border-gray-300 px-4 py-2">Profession</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className="border">
                <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={user.profileImg}
                    alt={`${user.username}'s profile`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">{user.profassion}</td>
                <td
                  className={`border border-gray-300 px-4 py-2 cursor-pointer ${user.status === "admin" ? "text-green-600" : "text-blue-600"}`}
                  onClick={() => openModal(user)}
                >
                  {user.role}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex items-center gap-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(user?._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Update Status for {currentUser.username}
            </h2>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="admin"
                  checked={selectedStatus === "admin"}
                  onChange={handleStatusChange}
                  className="form-radio"
                />
                admin
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="user"
                  checked={selectedStatus === "user"}
                  onChange={handleStatusChange}
                  className="form-radio"
                />
                user
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={() => handleSave(currentUser._id)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTableWithModal;
