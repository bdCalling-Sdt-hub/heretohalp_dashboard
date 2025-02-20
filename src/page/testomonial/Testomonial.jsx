import React, { useState } from "react";

import { imageUrl } from "../redux/api/baseApi";
import { message } from "antd";
import { useDeleteReviewMutation, useGetReviewQuery } from "../redux/api/manageApi";

export const Testomonial = () => {
  const { data: reviewData } = useGetReviewQuery();
  const [deleteReview] = useDeleteReviewMutation();

  const handleDelete = (id) => {
    console.log(id);
  
    deleteReview(id)
      .unwrap()
      .then((response) => {
        // Success message
        if (response.success) {
          message.success(response.message);  // Show success message
          console.log(response);
        }
      })
      .catch((error) => {
        // Error message
        const errorMessage = error?.data?.message || "An error occurred while deleting the review.";
        message.error(errorMessage);  // Show error message
        console.error(`Error deleting review:`, error);
      });
  };
  

  return (
    <div className="h-screen bg-gray-100">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Testimonials</h2>
        {reviewData?.data?.result?.length > 0 ? (
          reviewData.data.result.map((review) => (
            <div key={review._id} className="flex items-start border-b pb-4 mb-4">
              <img
                src={`${imageUrl}/${review.profile_image}`}
                alt={review.userName}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-700">{review.userName}</h3>
                <p className="text-sm text-gray-500">
                  {review.occupation} | {review.address}
                </p>
                <p className="mt-2 text-gray-600 italic">"{review.review}"</p>
                <p className="text-xs text-gray-400 mt-2">
                  Reviewed on: {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                className="bg-orange-600 text-white py-2 px-5 mt-4"
                onClick={() => handleDelete(review._id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
};
