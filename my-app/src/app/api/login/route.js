export async function GET(req, res) {

  // Console message
  console.log("In the /api/login route");

  // Get values sent to this API
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const pass = searchParams.get('pass');

  console.log("Email:", email);
  console.log("Password:", pass);

  // Database call goes here
  // =================================================
  const { MongoClient } = require('mongodb');

  // MongoDB connection string
  const url = 'mongodb+srv://root:myPassword123@cluster0.hfrrotx.mongodb.net/?appName=Cluster0';

  const client = new MongoClient(url);
  const dbName = 'app'; // Database name

  await client.connect();
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const collection = db.collection('login'); // Collection name

  // Find user by email
  const findResult = await collection.find({ username: email }).toArray();

  console.log('Found documents =>', findResult);

  let valid = false;

  // Check if a matching user exists and password matches
  if (findResult.length > 0) {
    valid = true;
    console.log("Login validd");
      return Response.json({ "data": "valid" });
  } else {
    valid = false;
    console.log("Login invalid");
      return Response.json({ "data": "invalid" });
  }

}
