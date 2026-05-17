import { Metadata } from "next";

const generateSEO = (title: string, description?: string): Metadata => ({
  title,
  description,
});

export default generateSEO
