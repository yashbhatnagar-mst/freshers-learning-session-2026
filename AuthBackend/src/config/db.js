import mongoose from "mongoose";

(async () => {
  try {
    await mongoose.connect("mongodb://admin:secretpassword@localhost:27017", {
      dbName: "authDb",
    });

    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
})();
