import React, { useEffect, useState , useCallback } from "react";
import "./list.css";
import HomeNav from "./HomeNav";

const WelcomePage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const parseJSON = (response) => {
    return response.json().then((data) => {
      if (!response.ok) {
        return Promise.reject(data);
      }
      return data;
    });
  };

  const handleResponse = useCallback(async (response) => {
    console.log("Response Status:", response.status);
    console.log("Response Headers:", response.headers);
    return parseJSON(response);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching products...");
        const response = await fetch(
          "http://localhost/ecommerceWebsite/backend/getData.php",
          {
            mode: "cors",
          }
        );
        const jsonData = await handleResponse(response);
        console.log("Fetched Products (Parsed):", jsonData);
        setProducts(jsonData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchData();
  }, [handleResponse]); 
  

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter((id) => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };

  const handleMassDelete = () => {
    if (selectedProducts.length === 0) {
      console.error("No products selected for deletion");

      return;
    }
    console.log("Selected Products hereeeeee:", selectedProducts);

    console.log(JSON.stringify({ selectedProducts }));
    fetch("http://localhost/ecommerceWebsite/backend/deleteProduct.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedProducts }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Mass Delete Response:", data);

          // Fetch updated product data after deletion
          fetch("http://localhost/ecommerceWebsite/backend/getData.php", {
            mode: "cors",
          })
            .then(handleResponse)
            .then((jsonData) => {
              console.log("Fetched Products (Parsed):", jsonData);
              setProducts(jsonData);
            })
            .catch((error) => console.error("Error fetching products:", error));
        } else {
          console.error("Error deleting products:", data.message);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  return (
    <div>
      <HomeNav
        selectedProducts={selectedProducts}
        handleMassDelete={handleMassDelete}
      />

      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <input
                className="select delete-checkbox"
                type="checkbox"
                checked={selectedProducts.includes(product.id)}
                onChange={() => handleCheckboxChange(product.id)}
              />

              <div key={product.sku} className="product">
                <p>{product.sku}</p>
                <p>{product.name}</p>
                <p>{product.value}</p>
                <p> {product.price}</p>
                <p></p>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default WelcomePage;
