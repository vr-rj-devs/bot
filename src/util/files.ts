import fs from "fs";
import path from "path";

export const getAllFiles = (base_path: string, exclude?: string[]) => {
  const dirents = fs.readdirSync(base_path, { recursive: true, withFileTypes: true });
  return dirents
    .filter((dirent: fs.Dirent) => {
      return dirent.isFile() && !exclude?.includes(path.join(dirent.path, dirent.name));
    })
    .map((dirent: fs.Dirent) => path.join(dirent.path, dirent.name));
};

export const getAllFolders = (base_path: string, exclude?: string[]) => {
  const dirents = fs.readdirSync(base_path, { recursive: true, withFileTypes: true });
  return dirents
    .filter((dirent: fs.Dirent) => {
      return dirent.isDirectory() && !exclude?.includes(path.join(dirent.path, dirent.name));
    })
    .map((dirent: fs.Dirent) => path.join(dirent.path, dirent.name));
};
