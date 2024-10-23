import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const useProductSubmit = (id) => {
  // State variables for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('');
  const [stockLevel, setStockLevel] = useState('');
  const [slug, setSlug] = useState('');
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [extraImage, setExtraImage] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [isCombination, setIsCombination] = useState(false); // Combination toggle

  const { register, handleSubmit, formState: { errors } } = useForm();

  // Handle Image Upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`https://suft-90bec7a20f24.herokuapp.com/product/admin/upload-images/${id}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setImageUrl(data.url);
        setExtraImage(data.url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed");
      }
    } catch (error) {
      toast.error("Error uploading image");
    }
  };

  // Handle Product Submission
  const handleProductSubmit = async (data) => {
    const productData = {
      title: data.title,
      description: data.description,
      sku,
      price: data.price,
      stockLevel: data.stockLevel,
      slug: data.slug,
      tags,
      imageUrl,
      extraImage,
      colors,
      sizes,
    };

    try {
      const response = await fetch("https://suft-90bec7a20f24.herokuapp.com/product/admin/create", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        toast.success("Product submitted successfully!");
      } else {
        const errorData = await response.json();
        toast.error("Error submitting product");
      }
    } catch (error) {
      toast.error("Error submitting product");
    }
  };

  // Color and Size Management
  const handleColorSelection = (e) => {
    const selectedColor = e.target.value;
    if (selectedColor && !colors.includes(selectedColor)) {
      setColors([...colors, selectedColor]);
    }
  };

  const handleSizeSelection = (e) => {
    const selectedSize = e.target.value;
    if (selectedSize && !sizes.includes(selectedSize)) {
      setSizes([...sizes, selectedSize]);
    }
  };

  const removeColor = (color) => {
    setColors(colors.filter((c) => c !== color));
  };

  const removeSize = (size) => {
    setSizes(sizes.filter((s) => s !== size));
  };

  const handleGenerateCombination = () => {
    // Implement combination generation logic here
  };

  // Tap toggle for "Basic Info" and "Combination" views
  const [tapValue, setTapValue] = useState("Basic Info");
  const handleProductTap = (value) => setTapValue(value);

  // Handle combination toggle
  const handleIsCombination = () => setIsCombination(!isCombination);

  return {
    title,
    setTitle,
    description,
    setDescription,
    sku,
    setSku,
    price,
    setPrice,
    stockLevel,
    setStockLevel,
    slug,
    setSlug,
    tags,
    setTags,
    imageUrl,
    setImageUrl,
    extraImage,
    setExtraImage,
    colors,
    setColors,
    sizes,
    setSizes,
    isCombination,
    setIsCombination,
    register,
    handleSubmit,
    errors,
    handleProductSubmit,
    handleImageUpload,
    handleColorSelection,
    handleSizeSelection,
    removeColor,
    removeSize,
    handleGenerateCombination,
    handleIsCombination,
    handleProductTap,
    tapValue,
  };
};

export default useProductSubmit;
