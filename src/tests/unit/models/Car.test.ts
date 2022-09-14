import { expect } from 'chai';
import { Model } from 'mongoose';
import * as sinon from 'sinon';
import { ICar } from '../../../interfaces/ICar';
import CarModel from '../../../models/Cars';
import { carMock, carMockUpdate, carMockWithId, carsMock } from '../../mocks/Cars';

describe('Model layer from cars', () => {
  const model = new CarModel();
  describe('read method', () => {
    beforeEach(() => {
      sinon.stub(Model, 'find').resolves(carsMock);
    });
    afterEach(sinon.restore);
    it('Tests if returns an array', async () => {
      const cars = await model.read();
      expect(cars).to.be.an('array');
      expect(cars).to.have.length(4);
    });
  });
  describe('readOne method', () => {
    beforeEach(() => {
      sinon.stub(Model, 'findOne').resolves(carMockWithId);
    });
    afterEach(sinon.restore);
    it('returns an object if the id is correct', async () => {
      const car = await model.readOne(carMockWithId._id);
      expect(car).to.be.an('object');
      expect(Object.keys(car as ICar)).to.have.length(9);
    });
    it('throws an error if the id is invalid', async () => {
      try {
        await model.readOne('ksdjfsçaldd');
      } catch (e: any) {
        expect(e).to.have.property('message', 'Invalid MongoId');
        expect(e).to.have.property('code', 400);
      }
    });
  });
  describe('create method', () => {
    beforeEach(() => {
      sinon.stub(Model, 'create').resolves(carMockWithId);
    });
    afterEach(sinon.restore);
    it('returns the object created with the id', async () => {
      const car = await model.create(carMock);
      expect(car).to.be.deep.equal(carMockWithId);
    });
  });
  describe('update method', () => {
    beforeEach(() => {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockUpdate);
    });
    afterEach(sinon.restore);
    it('returns the object created with the id', async () => {
      const car = await model.update(carMockUpdate._id, carMockUpdate);
      expect(car).to.be.deep.equal(carMockUpdate);
    });
    it('throws an error if the id is invalid', async () => {
      try {
        await model.update('ksdjfsçaldd', carMockUpdate);
      } catch (e: any) {
        expect(e).to.have.property('message', 'Invalid MongoId');
        expect(e).to.have.property('code', 400);
      }
    });
  });
  describe('delete method', () => {
    beforeEach(() => {
      sinon.stub(Model, 'deleteOne').resolves({ ...carMock, acknowledged: true, deletedCount: 1 });
    });
    afterEach(sinon.restore);
    it('returns the deleted object', async () => {
      const car = await model.delete(carMockWithId._id);
      expect(car).to.have.property('acknowledged', true);
      expect(car).to.have.property('deletedCount', 1);
    });
    it('throws an error if the id is invalid', async () => {
      try {
        await model.delete('jfsdhfkjsh');
      } catch (e: any) {
        expect(e).to.have.property('message', 'Invalid MongoId');
        expect(e).to.have.property('code', 400);
      }
    });
  });
});
