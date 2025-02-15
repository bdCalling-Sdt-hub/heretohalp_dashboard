import { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Upload, message } from 'antd';
import { useAddBlogMutation } from '../redux/api/blogApi';

export const AddBlog = () => {
    const [addBlog] = useAddBlogMutation();
    const editor = useRef(null);
    const [blogName, setBlogName] = useState('');
    const [blogDetails, setBlogDetails] = useState('');
    const [fileList, setFileList] = useState([]);
    const navigate = useNavigate();

    const config = {
        readonly: false,
        placeholder: 'Start typing...',
        style: { height: 300 },
        buttons: ['image', 'fontsize', 'bold', 'italic', 'underline', '|', 'font', 'brush', 'align']
    };

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const handleSubmit = async () => {
        if (!blogName || !blogDetails || fileList.length === 0) {
            message.error("Please fill all fields and upload an image");
            return;
        }

        const formData = new FormData();
        formData.append("title", blogName);
        formData.append("content", blogDetails);
        formData.append("blog_image", fileList[0].originFileObj);

        try {
            const response = await addBlog(formData).unwrap();
            if (response.success) {
                message.success("Blog added successfully");
                navigate(-1);
            } else {
                message.error("Failed to add blog");
            }
        } catch (error) {
            message.error("An error occurred while adding the blog");
        }
    };

    return (
        <div className="p-5 bg-white shadow-md rounded-lg">
            <div className="flex justify-between mb-7">
                <h1 className="flex gap-4 items-center">
                    <button className="text-[#EF4849]" onClick={() => navigate(-1)}>
                        <FaArrowLeft />
                    </button>
                    <span className="text-lg font-semibold">Add Blog</span>
                </h1>
            </div>

            <div className="mb-5">
                <label className="block font-semibold mb-2">Blog Name</label>
                <textarea
                    className="w-full p-3 border rounded-lg"
                    placeholder="Type Here..."
                    value={blogName}
                    onChange={(e) => setBlogName(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label className="block font-semibold mb-2">Blog Details</label>
                <JoditEditor
                    ref={editor}
                    value={blogDetails}
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => setBlogDetails(newContent)}
                />
            </div>

            <div className="mb-5">
                <label className="block font-semibold mb-2">Image</label>
                <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    beforeUpload={() => false}
                >
                    {fileList.length < 1 && '+ Upload'}
                </Upload>
            </div>

            <div className="mt-5 flex justify-center">
                <button onClick={handleSubmit} className="bg-[#02111E] py-2 px-6 rounded text-white font-semibold">
                    Save & Publish
                </button>
            </div>
        </div>
    );
};
