import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchProductIdQuery } from '../../redux/feature/product/productApi';
import { usePostReviewMutation } from '../../redux/feature/review/reviewApi';
import Swal from 'sweetalert2';
import axios from 'axios';

const PostAReview = ({ isModalOpen, handleClose }) => {
  const getToken = localStorage.getItem("token");
  console.log(getToken);
  const config = {
    headers: {
      Authorization: getToken,
    },
  };
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  console.log(user?._id)

  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');

  const [postReview] = usePostReviewMutation()

  const { refetch } = useFetchProductIdQuery(id, {
    skip: !id,
  });

  const handleRating = (value) => {
    setRating(value);
  };


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to post a review.');
      navigate('/login');
      return;
    }

    const newReview = {
      comments,
      rating,
      userId: user._id,
      productId: id,
    };

    try {

      const res = await axios.post(`http://localhost:5000/api/v1/post-review`, newReview, config)

      if (res) {
        Swal.fire({
          title: 'Review posted successfully!',
          icon: 'success',
          confirmButtonText: 'Close',
        })
        setRating(0);
        setComments('');
        refetch();
      }

    } catch (error) {
      alert('Error posting review');
      console.error(error);
      navigate("/login")
    } finally {
      handleClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 ${isModalOpen ? 'block' : 'hidden'} bg-black/90 flex items-center justify-center z-40 px-2`}
    >
      <div className="bg-white p-6 rounded-md shadow-lg w-96 z-50">
        <h2 className="text-lg font-bold mb-4">Post a Review</h2>

        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              className="cursor-pointer text-yellow-500 text-xl"
            >
              {rating >= star ? (
                <i className="ri-star-fill text-yellow-300"></i>
              ) : (
                <i className="ri-star-line"></i>
              )}
            </span>
          ))}
        </div>

        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows="4"
          className="w-full border border-gray-300 p-2 rounded-md mb-4"
          placeholder="Write your comment here..."
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-[#FA7B2D] text-black rounded-md flex items-center gap-2"
          >
            <i className="ri-close-line"></i> Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#FA7B2D] text-black rounded-md flex items-center gap-2"
          >
            <i className="ri-check-line"></i> Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAReview;