export const runtime = "nodejs";

import { ObjectId } from "mongodb";
import { getDB } from "./mongodb";
import bcrypt from "bcrypt";
import { Phone } from "lucide-react";

export interface User {
  _id: ObjectId;
  username: string;
  email: string;
  phone?: string;
  password?: string;
  provider?: string;
  createdAt: Date;
  updatedAt: Date;
  userRole: string;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const db = await getDB();
  return db.collection("users").findOne({ email: email.toLowerCase() });
}

export async function createUser(data: {
  username: string;
  email: string;
  phone: string;
  password: string;
  userRole: string;
}): Promise<User> {
  const db = await getDB();
  const existingEmail = await findUserByEmail(data.email);

  if (existingEmail) {
    throw new Error("Username Already taken");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const result = await db.collection("users").insertOne({
    username: data.username,
    email: data.email,
    phone: data.phone,
    password: hashedPassword,
    createdAt: new Date(),
    updateAt: new Date(),
    userRole: data.userRole,
  });

  return {
    _id: result.insertedId,
    username: data.username,
    email: data.email,
    phone: data.phone,
    createdAt: new Date(),
    updatedAt: new Date(),
    userRole: data.userRole,
  };
}

export async function createduserFromAuth(data: {
  email: string;
  username: string;
  provider: string;
  userRole: string;
}): Promise<User> {
  const db = await getDB();

  const result = await db.collection("users").insertOne({
    username: data.username,
    email: data.email,
    provider: data.provider,
    createdAt: new Date(),
    updatedAt: new Date(),
    userRole: data.userRole,
  });

  return {
    _id: result.insertedId,
    username: data.username,
    email: data.email,
    createdAt: new Date(),
    updatedAt: new Date(),
    userRole: data.userRole,
  };
}

export async function findB2BUserById(id: string) {
  const db = await getDB();
  return db.collection("B2B_users").findOne({ b2bProfileId: id });
}

export async function findB2BUserByEmail(email: string) {
  const db = await getDB();
  return db
    .collection("B2B_users")
    .findOne({ email: email.toLocaleLowerCase() });
}


export async function createB2BUser(data: {
  userName: string;
  email: string;
  phone: string;
  password: string;
  userRole: string;
  isActive: boolean;
  b2bProfileId: string;
  createdBy: string;
  createdAt: Date;
}) {
  const db = await getDB();

  if (!db) throw new Error("Database not connected yet.");

  const existingUserId = await findB2BUserById(data.b2bProfileId);
  const existingB2BEmail = await findB2BUserByEmail(data.email);

  if (existingB2BEmail) {
    throw new Error("Username Already taken");
  }

  if (existingUserId) throw new Error("B2B User already taken");

  const hashedPassword = await bcrypt.hash(data.password, 12);

  const result = await db.collection("B2B_users").insertOne({
    userName: data.userName,
    email: data.email,
    phone: data.phone,
    password: hashedPassword,
    userRole: data.userRole,
    isActive: data.isActive,
    b2bProfileId: data.b2bProfileId,
    createdBy: data.createdBy,
    createdAt: data.createdAt,
  });

  if (!result) {
    throw new Error("Result not found");
  }

  return {
    _id: result.insertedId,
    userName: data.userName,
    Phone: data.phone,
    userRole: data.userRole,
    isActive: data.isActive,
    email: data.email,
    b2bProfileId: data.b2bProfileId,
    createdBy: data.createdBy,
    createdAt: data.createdAt,
  };
}
