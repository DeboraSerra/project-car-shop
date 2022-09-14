const carMock = {
  "model": "Ford Ka",
  "year": 2017,
  "color": "black",
  "status": false,
  "buyValue": 0,
  "doorsQty": 2,
  "seatsQty": 4
}

const carMockWithId = {
  "_id": "631edc497e4a75f06d803c77",
  "buyValue": 0,
  "color": "black",
  "doorsQty": 2,
  "model": "Ford Ka",
  "seatsQty": 4,
  "status": false,
  "year": 2017,
  "__v": 0
}

const carMockUpdate = {
  "_id": "631edc497e4a75f06d803c77",
  "buyValue": 9000,
  "color": "black",
  "doorsQty": 2,
  "model": "Ford Ka",
  "seatsQty": 4,
  "status": true,
  "year": 2017,
  "__v": 0
}

const carsMock = [
  {
    "_id": "631edc497e4a75f06d803c77",
    "buyValue": 0,
    "color": "black",
    "doorsQty": 2,
    "model": "Ford Ka",
    "seatsQty": 4,
    "status": false,
    "year": 2017,
    "__v": 0
  },
  {
    "_id": "631eddcde6a4b59fde61104e",
    "buyValue": 0,
    "color": "white",
    "doorsQty": 4,
    "model": "Nissan Versa",
    "seatsQty": 5,
    "status": false,
    "year": 2020,
    "__v": 0
  },
  {
    "_id": "631edddee6a4b59fde611050",
    "buyValue": 0,
    "color": "silver",
    "doorsQty": 4,
    "model": "Prisma",
    "seatsQty": 5,
    "status": false,
    "year": 2018,
    "__v": 0
  },
  {
    "_id": "631eddf0e6a4b59fde611052",
    "buyValue": 0,
    "color": "Ocre",
    "doorsQty": 2,
    "model": "Bettle",
    "seatsQty": 4,
    "status": false,
    "year": 1974,
    "__v": 0
  }
]

export {
  carMock,
  carMockUpdate,
  carMockWithId,
  carsMock,
}
