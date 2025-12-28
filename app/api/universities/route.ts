import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "universities.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const universities = JSON.parse(fileData);

  // Combine all for "All" button
  const all = [
    ...universities.china,
    ...universities.australia,
    ...universities.malaysia,
  ];

  return NextResponse.json({ all, ...universities });
}
