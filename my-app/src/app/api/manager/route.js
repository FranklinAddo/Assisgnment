export async function GET(req) {
  console.log("In /api/orders");

  const { MongoClient } = require("mongodb");

  const url =
    "mongodb+srv://root:myPassword123@cluster0.hfrrotx.mongodb.net/?appName=Cluster0";
  const client = new MongoClient(url);
  const dbName = "app";

  await client.connect();
  console.log("Connected to MongoDB for orders");

  const db = client.db(dbName);
  const collection = db.collection("orders");

  const results = await collection.find({}).toArray();

  const orders = results.map((order) => ({
    orderId: order._id.toString(),
    customer: order.customer,
    items: order.items.length + " items",
    total: order.total || 0,
    date: order.date,
  }));

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  await client.close();

  return Response.json({
    orders,
    stats: {
      totalOrders,
      totalRevenue,
    },
  });
}
