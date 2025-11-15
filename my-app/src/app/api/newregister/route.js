export async function GET(req, res) {

  console.log("In the /api/register route");

  // Get values sent from the frontend
  const { searchParams } = new URL(req.url);

  const email = searchParams.get('email');
  const pass = searchParams.get('pass');
  const type = searchParams.get('type');
  const address = searchParams.get('address');
  const dob = searchParams.get('dob');

  console.log("Email:", email);
  console.log("Password:", pass);
  console.log("Account Type:", type);
  console.log("Address:", address);
  console.log("DOB:", dob);

  // Check required fields
  if (!email || !pass || !type) {
    return Response.json({ data: "invalid" });
  }

  // ==============================
  // MongoDB connection
  // ==============================
  const { MongoClient } = require("mongodb");

  const url =
    "mongodb+srv://root:myPassword123@cluster0.hfrrotx.mongodb.net/?appName=Cluster0";

  const client = new MongoClient(url);
  const dbName = "app";

  await client.connect();
  console.log("Connected to MongoDB");

  const db = client.db(dbName);
  const collection = db.collection("login");

  // Check if email already registered
  const existing = await collection.find({ username: email }).toArray();

  if (existing.length > 0) {
    await client.close();
    return Response.json({ data: "exists" });
  }

  // Create new user document
  const newUser = {
    username: email,
    password: pass,
    accountType: type,
    address: address || "",
    dateOfBirth: dob || "",
    createdAt: new Date(),
  };

  await collection.insertOne(newUser);
  await client.close();

  return Response.json({ data: "valid" });
}
