export async function GET(req, res) {
  console.log("in the /api/product API");

  const { MongoClient } = require("mongodb");

  const url =
    "mongodb+srv://root:myPassword123@cluster0.hfrrotx.mongodb.net/?appName=Cluster0";

  const client = new MongoClient(url);
  const dbName = "app";

  await client.connect();
  console.log("Connected successfully to MongoDB");

  const db = client.db(dbName);
  const collection = db.collection("products");

  const findResult = await collection.find({}).toArray();

  console.log("Found products:", findResult);

  // Convert MongoDB _id → string id
  const cleanedProducts = findResult.map((item) => ({
    id: item._id.toString(),
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image
  }));

  return Response.json({ data: cleanedProducts });
}
