import app from "./Server"
import mongoose from "mongoose";
import env from "./util/validateEnv";

const port = env.PORT;
const uri = env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => {
    console.log("SUCCESS MongoDB database connection");
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
