import { MongoClient } from 'mongodb'
// import dotenv from 'dotenv'
// dotenv.config()

const {MONGO_URL} = process.env

if (!MONGO_URL) {
  throw("please put your MONGO_URL in the environment")
}

const animals_collection = new Promise(
    (resolve,reject) => MongoClient.connect(MONGO_URL,
      (err,client) => {
        if (err) {reject(err)} else {resolve(client)}
      }
    )
  ).then((_) => _.db('animals').collection('animals'))

export const get_animals = async () => (await animals_collection).find({}).toArray()

export const get_animal = async (_id) => (await animals_collection).findOne({_id})

export const put_animal = async (animal) => (await animals_collection).insertOne(animal)

export const delete_animal = async (_id) => (await animals_collection).deleteOne({_id})
