import React, { useState } from 'react'
import { useDeleteNewsMutation, useGetAllNewsSubscribeQuery } from '../redux/api/feedbackApi'
import { toast } from 'sonner';
import { Input } from 'antd';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const News = () => {
  // Fetch the news data
  const [searchTerm, setSearch] = useState("");
  const navigate = useNavigate()
  const { data: news, isLoading, error } = useGetAllNewsSubscribeQuery({searchTerm});
  const [deleteNews] = useDeleteNewsMutation();

  const handleDelete = async (newsletterId) => {
    try {
      console.log(newsletterId);
      const res = await deleteNews({ newsletterId }); 
      console.log(res);
      toast.success(res?.data?.message); 
    } catch (error) {
      toast.error(error?.data?.data?.message)
    }
  };
  
  
  


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>No Data</div>;

  return (
    <div className="news-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <h1 onClick={() => navigate(-1)} className="flex gap-4 cursor-pointer">
          <button className="text-[#EF4849]">
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">Manage Business Partners</span>
        </h1>
        <Input  onChange={(e) => setSearch(e.target.value)} placeholder="Search here..." style={{ width: 300 }} />
      </div>
      
      {/* Loop through news and display each email with its createdAt */}
      <div className="news-list">
        {news?.data?.result?.map((item) => (
          <div key={item?._id} className="news-item p-4 mb-4  text-black">
            <p className=" font-bold">Email: {item?.email}</p>
            <p className="">Subscribed At: {new Date(item?.createdAt).toLocaleString()}</p>
            <button
              onClick={() => handleDelete(item?._id)}
              className="mt-2 text-white bg-red-600  py-2 px-4 rounded-lg hover:bg-red-800"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
