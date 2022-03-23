import {Validator} from 'jsonschema'

const schema = {
  "type": "object",
  "if": {
    "properties": { "Type": { "const": "Tiger" } }
  },
  "then": {
    "properties": {
      "Name": { "type": "string" },
      "Type": { "enum": ["Bear", "Tiger", "Snake", "Donkey"] },
      "Tiger Type": { "type": "string" }
    },
    "required": ["Name", "Type", "Tiger Type"],
    "additionalProperties": false
  },
  "else": {
    "properties": {
      "Name": { "type": "string" },
      "Type": { "enum": ["Bear", "Tiger", "Snake", "Donkey"] },
    },
    "required": ["Name","Type"],
    "additionalProperties": false, 
  }
}


export const validate_my_animal = (animal) => new Validator().validate(animal, schema)


