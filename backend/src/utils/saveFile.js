import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const DOMAIN = process.env.DOMAIN;

export const saveFile = async (file, basePath, domainPath) => {
   const fullPath = path.join(basePath, file.name);

   if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
   }

   await file.mv(fullPath);
   return `${DOMAIN}/api/${domainPath}/${file.name}`;
};
