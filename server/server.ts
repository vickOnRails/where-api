import express from "express";

import countriesRoutes from "./routes/countries";
import adminRoutes from "./routes/admin.routes";
import indexRoutes from "./routes";
import authRoutes from "./routes/auth.routes";

const app = express();

// Handle navigation and api documentation
app.use("/api", indexRoutes);

// Handle navigation and api documentation
app.use("/api/auth", authRoutes);

// Handle All admin related operations
app.use("/api/admin", adminRoutes);

// Handle all countries related functionality
app.use("/api/countries", countriesRoutes);

app.listen(5000, () => {
  console.log(`Listening at port 5000`);
});
