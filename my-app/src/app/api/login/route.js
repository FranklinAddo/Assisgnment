export async function GET(req, res) {
  console.log("In the /api/login route");

  // Get values sent to this API
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const pass = searchParams.get("pass");

  console.log("Email:", email);
  console.log("Password:", pass);

  // =================================================
  const { MongoClient } = require("mongodb");

  const url =
    "mongodb+srv://root:myPassword123@cluster0.hfrrotx.mongodb.net/?appName=Cluster0";

  const client = new MongoClient(url);
  const dbName = "app";

  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const collection = db.collection("login");

  // Find user by email
  const user = await collection.findOne({ email: email });

  console.log("Found user =>", user);

  if (!user) {
    console.log("Login invalid: email not found");
    return Response.json({ data: "invalid" });
  }

  // Check password
  if (user.password === pass) {
    console.log("Login valid");
    return Response.json({ data: "valid" });
  } else {
    console.log("Login invalid: wrong password");
    return Response.json({ data: "invalid" });
  }
}
