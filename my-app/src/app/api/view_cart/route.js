export async function GET(req) {
  console.log("In /api/view_cart");

  const { MongoClient } = require("mongodb");

  const url = "mongodb+srv://root:myPassword123@cluster0.hfrrotx.mongodb.net/?appName=Cluster0";

  const client = new MongoClient(url);
  const dbName = "app";

  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("shopping_cart");

  const USER = "user@sample.ie"; 

  const items = await collection.find({ username: USER }).toArray();

  const cleaned = items.map((item) => ({
    id: item._id.toString(),
    name: item.pname,
    quantity: item.quantity || 1,
    price: item.price || 0
  }));

  return Response.json({ data: cleaned });
}
