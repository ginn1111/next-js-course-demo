import { MongoClient } from 'mongodb';
export default async function DbHandler(handler) {
  const client = await MongoClient.connect(
    'mongodb+srv://vanthuanjw:Thuan12312@cluster0.ycqzrz1.mongodb.net/meetups?retryWrites=true&w=majority',
  );

  const res = await handler(client.db());
  client.close();
  return res;
}
