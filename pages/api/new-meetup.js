import { MongoClient } from 'mongodb';
import dbHandler from '../../db';

async function handler(req, res) {
  const data = req.body;
  await dbHandler(async (db) => {
    const meetupsCollections = db.collection('meetups');
    await meetupsCollections.insertOne(data);
    res.status(201).json({ message: 'Meetup Inserted!' });
  });
}

export default handler;
