export async function GET(req) {
  console.log("In /api/view_cart");

  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    console.log("No username provided");
    return Response.json({ data: [] });
  }

  const { MongoClient } = require("mongodb");
  const url = "mongodb+srv://root:myPassword123@cluster0.hfrrotx.mongodb.net/?appName=Cluster0";
  const client = new MongoClient(url);

  await client.connect();
  const db = client.db("app");

  const items = await db.collection("shopping_cart").find({ username }).toArray();

  const cleaned = items.map(item => ({
    id: item._id.toString(),
    name: item.pname,
    price: item.price || 0,
    quantity: item.quantity || 1,
  }));

  return Response.json({ data: cleaned });
}
