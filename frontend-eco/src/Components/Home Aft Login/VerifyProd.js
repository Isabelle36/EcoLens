import React, { useState, useEffect } from "react";
import { useFingerprint } from "../../Fingerprint/FingerprintContext";

const VerifyProd = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [qrFile, setQrFile] = useState(null);

  const { visitorId, isLoading, error } = useFingerprint();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/search-product?productName=${encodeURIComponent(
          searchQuery
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to search for products.");
      }

      const result = await response.json();
      setSearchResults(result.results);
    } catch (error) {
      console.error("Search Error:", error.message);
      alert(`Search Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!visitorId) return;
  
    setLoading(true);
    try {
      const requestBody = {
        visitorId,
      };
  
      // Send barcode or productName based on the selected product
      if (selectedProduct?.barcode) {
        requestBody.barcode = selectedProduct.barcode;
      } else if (selectedProduct?.productName) {
        requestBody.productName = selectedProduct.productName;
      } else {
        throw new Error("No product selected for verification.");
      }
  
      const response = await fetch("http://localhost:5000/verify-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error("Failed to verify the product.");
      }
  
      const result = await response.json();
  
      // Check if the product is eco-friendly
      const isEcoFriendly =
        result.ecoScore && ["A", "B"].includes(result.ecoScore.toUpperCase());
  
      setVerificationResult({
        ...result,
        isEcoFriendly, // Add this field to the result object
      });
    } catch (error) {
      console.error("Verification Error:", error.message);
      alert(`Verification Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  
  

  const handleQrUpload = async () => {
    if (!qrFile || !visitorId) return;

    const formData = new FormData();
    formData.append("qrCode", qrFile);
    formData.append("visitorId", visitorId);

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/upload-qr", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process QR code.");
      }

      const result = await response.json();
      setVerificationResult(result);
    } catch (error) {
      console.error("QR Upload Error:", error.message);
      alert(`QR Upload Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      {/* Visitor ID Display */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Visitor ID:</h2>
        <p>{visitorId || "Fetching Visitor ID..."}</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for a product (e.g., Butter)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 text-gray-900 rounded-lg"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* QR Code Upload */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Upload QR Code:</h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setQrFile(e.target.files[0])}
          className="w-full p-3 text-gray-900 rounded-lg"
        />
        <button
          onClick={handleQrUpload}
          disabled={loading || !qrFile}
          className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg"
        >
          {loading ? "Processing..." : "Upload and Verify QR Code"}
        </button>
      </div>

      {/* Search Results */}
      {/* Search Results */}
{searchResults.length > 0 && (
  <div className="mb-6">
    <h2 className="text-xl font-semibold">Search Results:</h2>
    <ul>
      {searchResults.map((product, index) => (
        <li
          key={index}
          className={`cursor-pointer ${
            selectedProduct?.barcode === product.barcode || selectedProduct?.productName === product.productName
              ? "text-green-600"
              : "text-green-400"
          } hover:text-green-500`}
          onClick={() => setSelectedProduct(product)}
        >
          {product.productName} - {product.brand}
        </li>
      ))}
    </ul>
  </div>
)}

{/* Verify Button */}
{selectedProduct && (
  <button
    onClick={handleVerify}
    disabled={loading}
    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
  >
    {loading ? "Verifying..." : "Verify Selected Product"}
  </button>
)}


      {/* Verification Result */}
      {/* Verification Result */}
{verificationResult && (
  <div className="mt-6">
    <h2 className="text-2xl font-semibold">Verification Result:</h2>
    <div className="bg-gray-800 p-4 rounded-lg text-sm">
      <p><strong>Product Name:</strong> {verificationResult.productName}</p>
      <p><strong>Brand:</strong> {verificationResult.brand}</p>
      <p><strong>Eco Score:</strong> {verificationResult.ecoScore}</p>
      <p><strong>Labels:</strong> {verificationResult.labels}</p>
      <p><strong>Packaging:</strong> {verificationResult.packaging}</p>
      <p>
        <strong>Eco-Friendly:</strong>{" "}
        <span
          className={`font-bold ${
            verificationResult.isEcoFriendly ? "text-green-500" : "text-red-500"
          }`}
        >
          {verificationResult.isEcoFriendly ? "Yes" : "No"}
        </span>
      </p>
    </div>
  </div>
)}

    </div>
  );
};

export default VerifyProd;