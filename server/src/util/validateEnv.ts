import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";
import "dotenv/config"

const env = cleanEnv(process.env, {
    MONGODB_URI: str(),
    PORT: port(),
});

export default env;