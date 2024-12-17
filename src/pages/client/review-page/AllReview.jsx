import React from "react";

const reviews = [
    {
        rating: 5,
        comment: "High quality product!",
        productId: "66d45fb27e580755d843823e",
        createdAt: "9/26/2024",
    },
    {
        rating: 4,
        comment: "I am reviewing",
        productId: "66bee99f8e8d6d6767446541",
        createdAt: "9/1/2024",
    },
    {
        rating: 5,
        comment: "I am updating my review",
        productId: "66c593cf25dce5322a47fd8d",
        createdAt: "8/28/2024",
    },
    {
        rating: 5,
        comment: "This is a high-quality product",
        productId: "66bee99f8e8d6d6767446538",
        createdAt: "8/16/2024",
    },
];

const ReviewCard = ({ rating, comment, productId, createdAt }) => (
    <div className="border rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold text-lg">Rating: {rating}</h3>
        <p className="mt-2">
            <span className="font-semibold">Comment:</span> {comment}
        </p>
        <p className="mt-2 text-gray-500 text-sm">
            <span className="font-semibold">Product ID:</span> {productId}
        </p>
        <p className="mt-1 text-gray-500 text-sm">
            <span className="font-semibold">Created At:</span> {createdAt}
        </p>
    </div>
);

const AddNewReviewCard = () => (
    <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 flex items-center justify-center text-gray-500">
        <span className="text-lg font-semibold">+ Add New Review</span>
    </div>
);

const ReviewList = () => {
    return (
        <div className="w-11/12 mx-auto mt-6">
            <h2 className="text-2xl font-semibold mb-6">Your Given Reviews</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {reviews.map((review, index) => (
                    <ReviewCard key={index} {...review} />
                ))}
                <AddNewReviewCard />
            </div>
        </div>
    );
};

export default ReviewList;

