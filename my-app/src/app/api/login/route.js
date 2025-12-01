export async function GET(req) {
  console.log("In the /api/login route");

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const pass = searchParams.get("pass");

  const { MongoClient } = require("mongodb");
  const bcrypt = require("bcrypt");

  const url =
    "mongodb+srv://root:myPassword123@cluster0.hfrrotx.mongodb.net/?appName=Cluster0";
  const client = new MongoClient(url);
  const dbName = "app";

  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const collection = db.collection("login");

  // Try to find normal user (email field)
  let user = await collection.findOne({ email: email });

  // If not found, try to find manager (username field)
  if (!user) {
    user = await collection.findOne({ username: email });
  }

  if (!user) {
    console.log("User not found");
    return Response.json({ data: "invalid" });
  }

  console.log("Found user account type:", user.account || user.acc_type);

  let passwordMatches = false;

  // If manager -> plain text password
  if (user.acc_type === "manager") {
    passwordMatches = pass === user.pass;
  } 
  else {
    // Normal user -> bcrypt verification
    passwordMatches = bcrypt.compareSync(pass, user.pass);
  }

  if (!passwordMatches) {
    console.log("Password incorrect");
    return Response.json({ data: "invalid" });
  }

  console.log("Login valid.");

  return Response.json({
    data: "valid",
    role: user.account || user.acc_type,
    email: email
  });
}
