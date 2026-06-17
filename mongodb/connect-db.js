const mongoose = require("mongoose");

(async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://admin:secretpassword@localhost:27017",
      {
        dbName: "mydatabase",
      },
    );

    console.log(connection.connection.readyState);
    console.log("Connection Success!");
  } catch (error) {
    console.error("MongoDB Connection Failed");
    console.error(error);
  }
})();
