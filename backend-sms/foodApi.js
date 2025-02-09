const express = require("express");
const axios = require("axios");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
const PORT = 5000;

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: "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", // Replace with your actual key
});

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to search for products by name
app.get("/search-product", async (req, res) => {
  const { productName } = req.query;

  if (!productName) {
    return res.status(400).json({ error: "Product name is required." });
  }

  try {
    // Search for products using Open Food Facts API
    const response = await axios.get(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        productName
      )}&search_simple=1&action=process&json=1`
    );

    if (!response.data.products || response.data.products.length === 0) {
      return res.status(404).json({ error: "No products found for the given name." });
    }

    // Extract product details for the response
    const results = response.data.products.map((product) => ({
      productName: product.product_name || "N/A",
      brand: product.brands || "N/A",
      barcode: product.code, // Useful for fetching detailed info later
      packaging: product.packaging || "N/A",
    }));

    res.json({ results });
  } catch (error) {
    console.error("Product Search Error:", error.message);
    res.status(500).json({ error: "Failed to search for products." });
  }
});

// Endpoint to fetch product details by name and generate AI insights
app.post("/verify-product", async (req, res) => {
  const { productName, visitorId } = req.body;

  if (!visitorId) {
    return res.status(400).json({ error: "Visitor ID is required." });
  }

  try {
    const response = await axios.get(
      `https://world.openfoodfacts.org/cgi/search.pl`,
      {
        params: {
          search_terms: productName,
          search_simple: 1,
          action: "process",
          json: 1,
        },
      }
    );

    const products = response.data.products;

    if (products && products.length > 0) {
      const product = products[0]; // Select the first product
      const ecoDetails = {
        productName: product.product_name || "N/A",
        brand: product.brands || "N/A",
        ecoScore: (product.ecoscore_grade || "N/A").toUpperCase(),
        labels: product.labels || "N/A",
        packaging: product.packaging || "N/A",
        visitorId,
      };

      // Use OpenAI to generate insights
      const prompt = `
        The following product was found in an eco-focused application:
        Product Name: ${ecoDetails.productName}
        Brand: ${ecoDetails.brand}
        EcoScore: ${ecoDetails.ecoScore}
        Labels: ${ecoDetails.labels}
        Packaging: ${ecoDetails.packaging}

        Provide:
        1. A short analysis of the product's sustainability based on the given details.
        2. Two eco-friendly alternative recommendations for this product.
      `;

      const aiResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an expert in sustainability and eco-friendly practices." },
          { role: "user", content: prompt },
        ],
        max_tokens: 150,
      });

      const aiSuggestions =
        aiResponse.choices?.[0]?.message?.content?.trim() || "No suggestions available.";

      console.log(`Visitor ${visitorId} verified product: ${productName}`);
      return res.status(200).json({
        ecoDetails,
        aiSuggestions,
      });
    } else {
      return res.status(404).json({ error: "No products found." });
    }
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "Error fetching product data." });
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
