import { v2 as cloudinary } from "cloudinary";
import { EnvUtil } from "./env.util.js";

cloudinary.config({
    cloud_name: EnvUtil.CLOUDINARY_CLOUD_NAME,
    api_key: EnvUtil.CLOUDINARY_API_KEY,
    api_secret: EnvUtil.CLOUDINARY_API_SECRET,
});

export default cloudinary;
