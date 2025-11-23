export async function GET(req, res) {
  console.log("In the /api/newregister route");

  const { searchParams } = new URL(req.url);

  const email = searchParams.get("email");
  const pass = searchParams.get("pass");
  const address = searchParams.get("address");
  const dob = searchParams.get("dob");

  if (!email || !pass) {
    return Response.json({ data: "invalid" });
  }

  const { MongoClient } = require("mongodb");

  const url = "mongodb+srv://root:myPassword123@cluster0.hfrrotx.mongodb.net/?appName=Cluster0";

  const client = new MongoClient(url);
  const dbName = "app";

  await client.connect();
  console.log("Connected to MongoDB");

  const db = client.db(dbName);
  const collection = db.collection("login");

  // Check if this email already exists
  const exists = await collection.findOne({ email: email });

  if (exists) {
    console.log("Email already exists!");
    await client.close();
    return Response.json({ data: "exists" });
  }

  // Insert NEW user into database
  const newUser = {
    email: email,
    password: pass,
    address: address,
    dob: dob,
    account: "customer",  
  };

  await collection.insertOne(newUser);

  await client.close();

  console.log("User registered:", newUser);

  return Response.json({ data: "valid" });
}
