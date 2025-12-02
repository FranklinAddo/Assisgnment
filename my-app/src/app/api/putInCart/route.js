export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const pname = searchParams.get("pname");
  const username = searchParams.get("username");
  const price = Number(searchParams.get("price")) || 0;

  if (!username) {
    console.log("❌ No username provided!");
    return Response.json({ data: "missing-user" });
  }

  const { MongoClient } = require("mongodb");
  const url = "mongodb+srv://root:myPassword123@cluster0.hfrrotx.mongodb.net/?appName=Cluster0";
  const client = new MongoClient(url);

  await client.connect();
  const db = client.db("app");

  const newItem = {
    pname,
    username,
    price,
    quantity: 1
  };

  await db.collection("shopping_cart").insertOne(newItem);

  return Response.json({ data: "inserted" });
}
