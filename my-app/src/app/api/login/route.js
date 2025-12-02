export async function GET(req) {
  console.log("In the /api/login route");

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const pass = searchParams.get("pass");

  const { MongoClient } = require("mongodb");
  const bcrypt = require("bcrypt");

  const url = "mongodb+srv://root:myPassword123@cluster0.hfrrotx.mongodb.net/?appName=Cluster0";
  const client = new MongoClient(url);

  await client.connect();
  const db = client.db("app");
  const collection = db.collection("login");

  const user = await collection.findOne({
    $or: [{ email: email }, { username: email }]
  });

  if (!user) {
    console.log("User not found");
    return Response.json({ data: "invalid" });
  }

  const role = user.account || user.acc_type || "customer";

  let validPassword = false;

  if (role === "manager") {
    validPassword = user.pass === pass; 
  } else {
    validPassword = bcrypt.compareSync(pass, user.pass);
  }

  if (!validPassword) {
    console.log("Password incorrect");
    return Response.json({ data: "invalid" });
  }

  return Response.json({
    data: "valid",
    role,
    email: user.email || user.username
  });
}
