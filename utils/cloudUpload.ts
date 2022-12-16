import axios from "axios";

export const uploadToCloudinary = (file: File): Promise<string> => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const uploadPreset = "w38nfm68";
      const cloudName = "dgbwenfdp";
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", uploadPreset);
      data.append("cloud_name", cloudName);
      const endpoint = `https://res.cloudinary.com/${cloudName}/image/upload/${uploadPreset}`;
      const res = await axios.post(endpoint, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      resolve(res.data?.url);
    } catch (err) {
      return reject(err);
    }
  });
};
