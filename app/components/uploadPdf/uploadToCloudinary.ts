export const UploadToCloudinary = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pdf_upload");
    formData.append("cloud_name", "dijzbql87");
    formData.append("folder", "pdfs");

    if (file.type === "application/pdf") {
      formData.append("resource_type", "raw");
    } else {
      formData.append("resource_type", "image");
    }

    const cloudinaryUrl =
      "https://api.cloudinary.com/v1_1/dijzbql87/image/upload";

    const uploadRes = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });

    const data = await uploadRes.json();

    if (data.secure_url) {
      return data.secure_url;
    } else {
      console.error("Cloudinary API Response Error:", data);
      throw new Error(data.error?.message || "Upload failed");
    }
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return null;
  }
};


export const handleFileUpload = async (file: File) => {
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pcakge_img_uploade");
    data.append("cloud_name", "dqyfwfeed");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqyfwfeed/image/upload",
        {
          method: "POST",
          body: data,
        },
      );

      const result = await res.json();

      if (result.secure_url) {
        return result.secure_url;
      } else {
        console.error("Cloudinary API Response Error:", result);
        throw new Error(result.error?.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      throw new Error("Upload failed");
    }
  };
