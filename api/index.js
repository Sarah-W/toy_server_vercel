
import {get_animals, put_animal} from '../lib/animal_db.js'
import dotenv from 'dotenv'
import {validate_my_animal} from '../lib/animal_validator.js'
dotenv.config()

const {SECRET_TOKEN} = process.env

module.exports = async (req, res) => {
  const auth = req.headers.authorization === SECRET_TOKEN
  let method = req.method
  switch (true) {
    case (method === 'GET' ):
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(await get_animals()))
      break;
    case (method == 'PUT'):
      if (auth){
        const buffers = [];
        for await (const chunk of req) {
          buffers.push(chunk);
        }
        const data = Buffer.concat(buffers).toString()
        try {
          const animal = JSON.parse(data)
          const validation_result = validate_my_animal(animal)
          console.log(validation_result)
          if (validation_result.errors.length !== 0) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ acknowledged:false, message: 'your JSON did not validate', errors:validation_result.errors }))
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(await put_animal(animal)))
          }
        } catch (ex) {
          console.error(ex)
          res.writeHead(400, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ acknowledged:false, message: 'Your JSON is unparsable, and you should feel bad' }))
        }
      } else {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ acknowledged:false, message: 'You are not allowed to add animals' }))
      }
      break;
    // case (method == 'DELETE'):
    //   res.writeHead(200, { 'Content-Type': 'application/json' })
    //   res.end(JSON.stringify({ message: 'DELETEing' }))
    //   break;
    default: 
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Not found!' }))
  }
}