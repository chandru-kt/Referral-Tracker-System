import { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';

export default function ReferralForm({ onSuccess }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jobTitle: '',
    resume: null,
  });
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    await axios.post('http://localhost:5000/candidates', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    navigate('/dashboard');
    onSuccess();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, resume: file });
    if (file) setFileUploaded(true);
  };

  const handleRemoveFile = () => {
    setFormData({ ...formData, resume: null });
    setFileUploaded(false);
  };

  return (
    <div className="flex items-center justify-center h-fit mt-32 mb-32 w-full">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 bg-white shadow-lg rounded w-full max-w-md"
      >
        {['name', 'email', 'phone', 'jobTitle'].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full border p-2 rounded"
            value={formData[field]}
            onChange={(e) =>
              setFormData({ ...formData, [field]: e.target.value })
            }
            required
          />
        ))}

        <input
          type="file"
          accept="application/pdf"
          id="resume"
          className="hidden"
          onChange={handleFileChange}
        />

        {!fileUploaded ? (
          <label
            htmlFor="resume"
            className="w-full text-blue-500 cursor-pointer border p-2 rounded block text-center"
          >
            Upload File
          </label>
        ) : (
          <div className="w-full p-2 border rounded flex justify-between items-center">
            <span className="truncate">{formData.resume.name}</span>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-red-500 ml-4"
            >
              Remove
            </button>
          </div>
        )}

        <button className="bg-blue-500 text-white p-2 rounded w-full">Submit</button>
      </form>
    </div>
  );
}
