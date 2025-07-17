import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const sweetCategories = [
  'Chocolate',
  'Candy',
  'Pastry',
  'Indian Mithai',
  'Bakery',
  'Dessert',
  'Other'
];

export default function EditSweet() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // Initialize formData with the sweet data from location state or empty values
  const [formData, setFormData] = useState(state?.sweet || {
    name: '',
    price: '',
    quantity: '',
    category: ''
  });
  
  const [originalData,setOriginalData] = useState(state?.sweet || {
    name: '',
    price: '',
    quantity: '',
    category: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(!state?.sweet);

  useEffect(() => {
    // Only fetch if we didn't get the sweet data from state
    if (!state?.sweet) {
      const fetchSweet = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/sweets/${id}`);
          setFormData(response.data);
            setOriginalData(response.data);
        } catch (err) {
          toast.error(`❌ Failed to load sweet: ${err.response?.data?.error || err.message}`, {
            position: "top-center",
            autoClose: 5000,
            theme: "colored"
          });
          navigate('/');
        } finally {
          setIsLoading(false);
        }
      };
      fetchSweet();
    }
  }, [id, navigate, state?.sweet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create an object with only the changed fields
      const changedFields = {};
      for (const key in formData) {
        if (formData[key] !== originalData[key]) {
          changedFields[key] = formData[key];
        }
      }

      // If nothing changed, show message and return
      if (Object.keys(changedFields).length === 0) {
        toast.info('No changes were made', {
          position: "top-center",
          autoClose: 2000,
          theme: "colored"
        });
        return;
      }

      // Prepare data for submission with proper types
      const dataToSend = {
        ...changedFields,
        price: changedFields.price ? parseFloat(changedFields.price) : undefined,
        quantity: changedFields.quantity ? parseInt(changedFields.quantity) : undefined
      };

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/sweets/${id}`,
        dataToSend
      );
      
      toast.success('Sweet updated successfully! 🍬', {
        position: "top-center",
        autoClose: 2000,
        theme: "colored"
      });

      setTimeout(() => navigate('/'), 2000);
      
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to update sweet';
      toast.error(`❌ ${errorMessage}`, {
        position: "top-center",
        autoClose: 5000,
        theme: "colored"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Loading sweet details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">Edit Sweet</h1>
            <p className="mt-2 text-sm text-gray-600">Update the details of your sweet</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Sweet Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price (₹)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">₹</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="0"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-md"
                  required
                >
                  <option value="">Select a category</option>
                  {sweetCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/sweets')}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : 'Update Sweet'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}