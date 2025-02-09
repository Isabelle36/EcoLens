const express = require("express");
const axios = require("axios");
const multer = require("multer");
const QRCode = require("qrcode-reader");
const Jimp = require("jimp");
const cors = require("cors"); // Added missing import

const app = express();
app.use(express.json());
const PORT = 5000;
const upload = multer({ dest: "uploads/" });

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
  const { productName, barcode, visitorId } = req.body;

  if (!visitorId) {
    return res.status(400).json({ error: "Visitor ID is required." });
  }

  try {
    let response;

    if (barcode) {
      // Fetch by barcode
      response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
    } else if (productName) {
      // Fetch by product name
      response = await axios.get(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
          productName
        )}&search_simple=1&action=process&json=1`
      );

      if (response.data.products && response.data.products.length > 0) {
        // Take the first matching product
        response = {
          data: {
            product: response.data.products[0],
            status: 1,
          },
        };
      } else {
        return res.status(404).json({ error: "Product not found" });
      }
    } else {
      return res.status(400).json({ error: "Product name or barcode is required." });
    }

    const product = response.data;

    if (product.status === 1) {
      const ecoDetails = {
        productName: product.product.product_name || "N/A",
        brand: product.product.brands || "N/A",
        ecoScore: (product.product.ecoscore_grade || "N/A").toUpperCase(),
        labels: product.product.labels || "N/A",
        packaging: product.product.packaging || "N/A",
        visitorId,
      };

      return res.status(200).json(ecoDetails);
    } else {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching product data" });
  }
});



app.post("/upload-qr", upload.single("qrCode"), async (req, res) => {
  const { visitorId } = req.body;

  if (!visitorId) {
    return res.status(400).json({ error: "Visitor ID is required." });
  }

  try {
    const image = await Jimp.read(req.file.path);
    const qr = new QRCode();

    qr.callback = async (err, value) => {
      if (err) {
        console.error("QR Code Error:", err);
        return res.status(400).json({ error: "Invalid QR code." });
      }

      const barcode = value.result;

      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        );
        const product = response.data;

        if (product.status === 1) {
          const ecoDetails = {
            productName: product.product.product_name || "N/A",
            brand: product.product.brands || "N/A",
            ecoScore: (product.product.ecoscore_grade || "N/A").toUpperCase(),
            labels: product.product.labels || "N/A",
            packaging: product.product.packaging || "N/A",
            visitorId, // Track which user performed this action
          };

          console.log(`Visitor ${visitorId} verified product via QR code: ${barcode}`);
          return res.status(200).json(ecoDetails);
        } else {
          return res.status(404).json({ error: "Product not found." });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching product data." });
      }
    };

    qr.decode(image.bitmap);
  } catch (error) {
    console.error("File Upload Error:", error);
    res.status(500).json({ error: "Failed to process QR code." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
