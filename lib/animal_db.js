import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const {MONGO_URL} = process.env

if (!MONGO_URL) {
  throw("please put your MONGO_URL in the environment")
}

const client = new MongoClient(MONGO_URL)
client.connect()

export const animals_collection = client.db('animals').collection('animals')

export const get_animals = () => animals_collection.find({}).toArray()

export const get_animal = (_id) => animals_collection.findOne({_id})

export const put_animal = (animal) => animals_collection.insertOne(animal)

export const delete_animal = (_id) => animals_collection.deleteOne({_id})
