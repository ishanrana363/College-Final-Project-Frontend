// import React, { useState } from 'react'
// import { useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom'
// import { useFetchProductIdQuery } from '../../redux/feature/product/productApi';


// const PostAReview = ({ isModalOpen, handleClose }) => {
//   const { id } = useParams();
//   const { user } = useSelector((state) => state.auth);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState('');

//   const { refetch } = useFetchProductIdQuery(id, {
//     skip: !id
//   });

//   const handleRating = (value) => {
//     setRating(value);
//   }

//   const [postAReview] = usePostAReviewMutation();
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newReview = {
//       comment: comment,
//       rating: rating,
//       userId: user?._id,
//       productId: id
//     }

//     if (!user) {
//       alert("You must be logged in to post a review.");
//       navigate("/login")
//       return;
//     }

//     try {
//       const response = await postAReview(newReview).unwrap();
//       console.log(response);
//       alert("Review posted successfully!")
//       setRating(0);
//       setComment('');
//       refetch();
//     } catch (error) {
//       alert("Error posting review")
//     }

//     handleClose();
//   }


//   return (
//     <div
//       className={`fixed inset-0 ${isModalOpen ? "block" : 'hidden'} bg-black/90 flex items-center justify-center z-40 px-2`}
//     >
//       <div className="bg-white p-6 rounded-md shadow-lg w-96 z-50">
//         <h2 className="text-lg font-bold mb-4">Post a Review</h2>

//         <div className="flex items-center mb-4">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <span
//               key={star}
//               onClick={() => handleRating(star)}
//               className="cursor-pointer text-yellow-500 text-xl"
//             >
//               {rating >= star ? (
//                 <i className="ri-star-fill"></i>
//               ) : (
//                 <i className="ri-star-line"></i>
//               )}
//             </span>
//           ))}
//         </div>

//         <textarea
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           rows="4"
//           className="w-full border border-gray-300 p-2 rounded-md mb-4"
//           placeholder="Write your comment here..."
//         />

//         <div className="flex justify-end gap-2">
//           <button
//             onClick={handleClose}
//             className="px-4 py-2 bg-gray-300 rounded-md flex items-center gap-2"
//           >
//             <i className="ri-close-line"></i> Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 bg-primary text-white rounded-md flex items-center gap-2"
//           >
//             <i className="ri-check-line"></i> Submit
//           </button>
//         </div>
//       </div>
//     </div>

//   )
// }

// export default PostAReview