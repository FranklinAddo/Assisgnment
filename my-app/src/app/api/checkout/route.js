// app/api/checkout/route.js

export async function GET(req) {
  console.log("In /api/checkout");

  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return Response.json({ status: "error", message: "Missing username" });
  }

  const { MongoClient } = require("mongodb");
  const url = "mongodb+srv://root:myPassword123@cluster0.hfrrotx.mongodb.net/?appName=Cluster0";

  const client = new MongoClient(url);
  await client.connect();
  const db = client.db("app");

  // ---------------- FETCH CART ----------------
  const cartItems = await db
    .collection("shopping_cart")
    .find({ username })
    .toArray();

  if (cartItems.length === 0) {
    await client.close();
    return Response.json({ status: "error", message: "Cart empty" });
  }

  // ---------------- BUILD ORDER ----------------
  const total = cartItems.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 1;
    return sum + price * qty;
  }, 0);

  const orderData = {
    username,
    items: cartItems,
    total,
    date: new Date().toISOString(),
  };

  // Insert into "orders"
  await db.collection("orders").insertOne(orderData);

  // ---------------- CLEAR CART ----------------
  await db.collection("shopping_cart").deleteMany({ username });

  await client.close();

  return Response.json({ status: "success" });
}
