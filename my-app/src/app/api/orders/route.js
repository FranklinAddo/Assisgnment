export async function GET(req) {
  console.log("In /api/orders");

  const { MongoClient } = require("mongodb");

  const url = "mongodb+srv://root:myPassword123@cluster0.hfrrotx.mongodb.net/?appName=Cluster0";
  
  const client = new MongoClient(url);

  await client.connect();
  console.log("Connected to MongoDB for orders");

  const db = client.db("app");
  const collection = db.collection("orders");

  const results = await collection.find({}).toArray();

  const orders = results.map((order) => ({
    orderId: order._id.toString(),
    customer: order.username,          
    items: order.items.length + " items",
    total: order.total || 0,
    date: new Date(order.date).toLocaleString(),
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
