import { useState } from "react";

function ProductDrawer() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    category: "",
    size: "",
    color: "",
    stockLevel: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });

      // Generate image preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      setUploadError("Please select an image to upload.");
      return;
    }

    // Create a formData object to send the image and other data to the API
    const submissionData = new FormData();
    submissionData.append("name", formData.name);
    submissionData.append("description", formData.description);
    submissionData.append("price", formData.price);
    submissionData.append("category", formData.category);
    submissionData.append("size", formData.size);
    submissionData.append("color", formData.color);
    submissionData.append("stockLevel", formData.stockLevel);
    submissionData.append("image", formData.image);

    try {
      // Replace with actual API endpoint
      const response = await fetch(
        "https://suft-90bec7a20f24.herokuapp.com/product/admin/create",
        {
          method: "POST",
          body: submissionData, // Important: Send the FormData object
          headers: {
            // 'Content-Type': 'multipart/form-data' is NOT required because browser sets it automatically
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit product");
      }

      alert("Product added successfully");
      setUploadError(null); // Reset error if successful
    } catch (error) {
      console.error("Error:", error);
      setUploadError("Error adding product. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label className="block font-medium">Product Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter product description"
          />
        </div>

        {/* Image Upload Section */}
        <div className="max-w-md mx-auto mt-8">
      {/* Image Upload Section */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Product Images</label>
        <div className="border-2 border-dashed border-gray-300 bg-gray-50 relative p-6 rounded-lg flex justify-center items-center">
          {/* This is the actual image input field */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {previewImage ? (
            // Display preview of the uploaded image
            <div className="w-full h-full flex justify-center items-center">
              <img
                src={previewImage}
                alt="Preview"
                className="max-h-64 object-contain"
              />
            </div>
          ) : (
            // Display the placeholder text when no image is selected
            <div className="text-center text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7V21a2 2 0 002 2h14a2 2 0 002-2V7M16 3h-4m0 0H8m4-2v6m0 0v2m0-2H8m4-2h4"
                />
              </svg>
              <p className="text-sm">Drag your images here</p>
              <p className="text-xs text-gray-400">
                Only *.jpeg, *.webp, and *.png images will be accepted
              </p>
            </div>
          )}
        </div>
        {uploadError && (
          <div className="mt-2 text-red-600 text-sm">{uploadError}</div>
        )}
      </div>
    </div>

        <div>
          <label className="block font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Category</option>
            <option value="clothing">Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="home">Home</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter price"
            />
          </div>
          <div>
            <label className="block font-medium">Stock Level</label>
            <input
              type="number"
              name="stockLevel"
              value={formData.stockLevel}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter stock level"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Size</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter size"
            />
          </div>
          <div>
            <label className="block font-medium">Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter color"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-green-500 rounded-lg"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductDrawer;
