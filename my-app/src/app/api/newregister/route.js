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
  const existing = await collection.insertOne({"email":"johnsmith@gmail.com","firstname":"john","lastname":"smith","password":"12345678","account":"customer"})

  // Create new user document
 

  await client.close();

  return Response.json({ data: "valid" });
}
