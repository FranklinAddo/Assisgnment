import { MongoClient } from "mongodb";

export async function GET() {
  const url = "mongodb+srv://root:myPassword123@cluster0.hfrrotx.mongodb.net/?appName=Cluster0";
  const client = new MongoClient(url);

  await client.connect();
  const db = client.db("app");

  const orders = await db.collection("orders").find({}).toArray();

  const salesByDate = {};

  orders.forEach((order) => {
    const day = order.date?.substring(0, 10);

    if (!salesByDate[day]) salesByDate[day] = 0;
    salesByDate[day] += 1; 
  });

  await client.close();

  return Response.json({ data: salesByDate });
}
