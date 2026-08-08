import app from "./app.js";
import { connectDB } from "../config/db.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error(`Error starting server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
