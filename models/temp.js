import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    $match: {
      product: new ObjectId('63ff35175624b62e71fbcdec'),
    },
  },
  {
    $group: {
      _id: null,
      averageRating: {
        $avg: '$rating',
      },
      numOfReviews: {
        $sum: 1,
      },
    },
  },
];

const client = await MongoClient.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const coll = client.db('09-E-COMMERCE-API').collection('reviews');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();

//Grouping Our Reviews Based On Rating
import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

// const agg = [
//   {
//     $match: {
//       product: new ObjectId('63ff35175624b62e71fbcdec'),
//     },
//   },
//   {
//     $group: {
//       _id: '$rating',
//       amount: {
//         $sum: 1,
//       },
//     },
//   },
// ];

// const client = await MongoClient.connect('', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const coll = client.db('09-E-COMMERCE-API').collection('reviews');
// const cursor = coll.aggregate(agg);
// const result = await cursor.toArray();
// await client.close();
