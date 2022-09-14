const motorcycleMock = {
  "model": "Moto Bagger",
  "year": 2018,
  "color": "green",
  "status": false,
  "buyValue": 0,
  "category": "Custom",
  "engineCapacity": 2500
};

const motorcycleMockWithId = {
  "buyValue": 0,
  "color": "green",
  "model": "Moto Bagger",
  "status": false,
  "year": 2018,
  "category": "Custom",
  "engineCapacity": 2500,
  "_id": "631eefaf5b8bc4ff6dcdba67",
  "__v": 0
};

const motorcycleMockUpdate = {
  "buyValue": 0,
  "color": "green",
  "model": "Moto Bagger",
  "status": false,
  "year": 2018,
  "category": "Custom",
  "engineCapacity": 2000,
  "_id": "631eefaf5b8bc4ff6dcdba67",
  "__v": 0
}

const motorcyclesMock = [
  {
    "_id": "631eef0e5b8bc4ff6dcdba5d",
    "buyValue": 0,
    "color": "silver",
    "model": "Moto Cruiser",
    "status": false,
    "year": 2022,
    "category": "Street",
    "engineCapacity": 2000,
    "__v": 0
  },
  {
    "_id": "631eef655b8bc4ff6dcdba61",
    "buyValue": 0,
    "color": "red",
    "model": "Moto Off Road - Enduro",
    "status": false,
    "year": 2018,
    "category": "Trail",
    "engineCapacity": 2500,
    "__v": 0
  },
  {
    "_id": "631eef815b8bc4ff6dcdba63",
    "buyValue": 0,
    "color": "green",
    "model": "Scooter",
    "status": false,
    "year": 2018,
    "category": "Street",
    "engineCapacity": 2500,
    "__v": 0
  },
  {
    "_id": "631eefaf5b8bc4ff6dcdba67",
    "buyValue": 0,
    "color": "green",
    "model": "Moto Bagger",
    "status": false,
    "year": 2018,
    "category": "Custom",
    "engineCapacity": 1500,
    "__v": 0
  }
]

export {
  motorcycleMock,
  motorcycleMockUpdate,
  motorcycleMockWithId,
  motorcyclesMock,
}
