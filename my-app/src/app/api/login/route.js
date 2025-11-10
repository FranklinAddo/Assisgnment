export async function GET(req, res) {


  // Make a note we are on

  // the api. This goes to the console.

  console.log("in the api page")



  // get the values

  // that were sent across to us.

  const { searchParams } = new URL(req.url)

  const email = searchParams.get('email')

  const pass = searchParams.get('pass')
  const address = searchParams.get('address')


  console.log(email);

  console.log(pass);


  console.log(address);
 


  // database call goes here
  // =================================================

  const { MongoClient } = require('mongodb');


  //const url = 'mongodb://root:example@localhost:27017/';

  const url = 'mongodb+srv://root:myPassword123@cluster0.hfrrotx.mongodb.net/?appName=Cluster0';

  const client = new MongoClient(url);



  const dbName = 'app'; // database name

  await client.connect();

  console.log('Connected successfully to server');

  const db = client.db(dbName);

  const collection = db.collection('login'); // collection name

  const findResult = await collection.find({"username": email}).toArray();

  console.log('Found documents =>', findResult);


  let valid = false

  if(findResult.length >0 ){

          valid = true;

          console.log("login valid")

  } else {


        valid = false;

        console.log("login invalid")

  }



 //==========================================================

  // at the end of the process we need to send something back.

  return Response.json({ "data":"valid" })

}