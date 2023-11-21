import React, { useState } from "react";
import "./style.css";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    price: "",
    selectedType: "Switcher",
    weight: "",
    size: "",
    height: "",
    length: "",
    width: "",
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [alreadyExists, setAlreadyExists] = useState(null);
  const [fillDataPlease, setFillDataPlease] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingProducts = await fetchExistingProducts();
    const skuExists = existingProducts.some(
      (product) => product.sku === formData.sku
    );

    if (skuExists) {
      console.error("Error: SKU already exists");
      setAlreadyExists("Product Already exists");
      setTimeout(() => {
        setAlreadyExists(null);
      }, 3000); 
      setFormData({
        sku: "",
        name: "",
        price: "",
        selectedType: "Switcher",
        weight: "",
        size: "",
        height: "",
        length: "",
        width: "",
      });
      return;
    }

    if (
      !formData.sku ||
      !formData.name ||
      !formData.price ||
      !formData.selectedType ||
      (formData.selectedType === "Book" && !formData.weight) ||
      (formData.selectedType === "DVD" && !formData.size) ||
      (formData.selectedType === "Furniture" &&
        (!formData.height || !formData.width || !formData.length))
    ) {
      setFillDataPlease("Please fill in all required fields");
      setTimeout(() => {
        setFillDataPlease(null);
      }, 3000);
      return;
    }

    let additionalInfo = {};

    switch (formData.selectedType) {
      case "Book":
        additionalInfo.weight = `${formData.weight} kg`;
        break;
      case "DVD":
        additionalInfo.size = `${formData.size} MB`;
        break;
      case "Furniture":
        additionalInfo = `${formData.height}cmx${formData.width}cmx${formData.length}cm`;
        break;
      default:
        break;
    }

    const product = {
      sku: formData.sku,
      name: formData.name,
      price: formData.price,
      type: formData.selectedType,
      additionalInfo,
    };

    console.log(product);

    try {
      const response = await fetch(
        "http://localhost/ecommerceWebsite/backend/main.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      if (response.ok) {
        console.log(product);
        console.log("Data inserted successfully");
        setSuccessMessage("Data inserted successfully");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 2000); // Hide the error message after 3 seconds

        setFormData({
          sku: "",
          name: "",
          price: "",
          selectedType: "Switcher",
          weight: "",
          size: "",
          height: "",
          length: "",
          width: "",
        });
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const fetchExistingProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost/ecommerceWebsite/backend/getData.php"
      );
      if (response.ok) {
        const products = await response.json();
        return products;
      } else {
        console.error("Error:", response.statusText);
        return [];
      }
    } catch (error) {
      console.error("Error:", error.message);
      return [];
    }
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="sku">SKU:</label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={formData.sku}
            placeholder="Enter a unique SKU value"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            placeholder="Enter a value in $"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            placeholder="Enter a product name"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Switcher:</label>
          <select
            value={formData.selectedType}
            name="selectedType"
            onChange={handleChange}
          >
            <option value="Switcher">Type switcher</option>
            <option value="Book">Book</option>
            <option value="DVD">DVD</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>

        {formData.selectedType === "Switcher" ? (
          <p>Please select a type</p>
        ) : formData.selectedType === "Book" ? (
          <div className="form-group">
            <label htmlFor="weight">Weight:</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              placeholder="Enter a weight in Kg"
              onChange={handleChange}
            />
          </div>
        ) : formData.selectedType === "DVD" ? (
          <div className="form-group">
            <label htmlFor="size">Size:</label>
            <input
              type="number"
              id="size"
              name="size"
              value={formData.size}
              placeholder="Enter a size in MB"
              onChange={handleChange}
            />
          </div>
        ) : (
          <div className="form-group">
            <label htmlFor="height">Height:</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              placeholder="Enter a value in cm"
              onChange={handleChange}
            />
            <div className="d-flex p-2"></div>

            <label htmlFor="width">Width:</label>
            <input
              type="number"
              id="width"
              name="width"
              value={formData.width}
              placeholder="Enter a value in cm"
              onChange={handleChange}
            />
            <div className="d-flex p-2"></div>

            <label htmlFor="length">Length:</label>
            <input
              type="number"
              id="length"
              name="length"
              value={formData.length}
              placeholder="Enter a value in cm"
              onChange={handleChange}
            />
            <div className="d-flex p-2"></div>
          </div>
        )}

        <button type="submit" className="btn btn-primary btn-sm">Submit</button>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {alreadyExists && (
          <div className="success-message">{alreadyExists}</div>
        )}

        {fillDataPlease && (
          <div className="success-message">{fillDataPlease}</div>
        )}
      </form>
    </>
  );
};
export default AddProductForm;
