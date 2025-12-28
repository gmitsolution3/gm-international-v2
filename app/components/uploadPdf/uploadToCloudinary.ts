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
