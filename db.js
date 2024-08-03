import { MongoClient } from "mongodb";

// Use a proper MongoDB URI
const uri = 'mongodb://127.0.0.1:27017'; // Specify the port if it's not the default one

const client = new MongoClient(uri);

const main = async () => {
    try {
        await client.connect(); // Connect to the MongoDB server

        const db = client.db('Dev-shop'); // Get the database
        const collection = db.collection('products'); // Get the collection
        const data = await collection.aggregate([{$project:{ company: 1,_id:0 }}]).toArray() // Query the collection
        console.log(data);

        return 'data';
    } catch (e) {
        console.log(e);
    } finally {
        await client.close(); // Ensure the client is closed
    }
}

main();