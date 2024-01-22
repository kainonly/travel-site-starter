import { Db, MongoClient } from 'mongodb';

import clientPromise from '@/lib/mongodb';

interface Instance {
  mgo: MongoClient;
  db: Db;
}

export default async function getInstance(): Promise<Instance> {
  const client = await clientPromise;
  return { mgo: client, db: client.db(process.env.DATABASE) };
}
