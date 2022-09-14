import { expect } from 'chai';
import { Model } from 'mongoose';
import * as sinon from 'sinon';
import { IMotorcycle } from '../../../interfaces/IMotorcycle';
import MotorcycleModel from '../../../models/Motorcycle';
import { motorcycleMock, motorcycleMockUpdate, motorcycleMockWithId, motorcyclesMock } from '../../mocks/Motorcycles';

const invalidId = 'Id must have 24 hexadecimal characters';

describe('Model layer from motorcycles', () => {
  const model = new MotorcycleModel();
  describe('read method', () => {
    beforeEach(() => {
      sinon.stub(Model, 'find').resolves(motorcyclesMock);
    });
    afterEach(sinon.restore);
    it('Tests if returns an array', async () => {
      const motorcycles = await model.read();
      expect(motorcycles).to.be.an('array');
      expect(motorcycles).to.have.length(4);
    });
  });
  describe('readOne method', () => {
    beforeEach(() => {
      sinon.stub(Model, 'findOne').resolves(motorcycleMockWithId);
    });
    afterEach(sinon.restore);
    it('returns an object if the id is correct', async () => {
      const motorcycle = await model.readOne(motorcycleMockWithId._id);
      expect(motorcycle).to.be.an('object');
      expect(Object.keys(motorcycle as IMotorcycle)).to.have.length(9);
    });
    it('throws an error if the id is invalid', async () => {
      try {
        await model.readOne('ksdjfsçaldd');
      } catch (e: any) {
        expect(e).to.have.property('message', invalidId);
        expect(e).to.have.property('code', 400);
      }
    });
  });
  describe('create method', () => {
    beforeEach(() => {
      sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
    });
    afterEach(sinon.restore);
    it('returns the object created with the id', async () => {
      const motorcycle = await model.create(motorcycleMock as IMotorcycle);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
  });
  describe('update method', () => {
    beforeEach(() => {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleMockUpdate);
    });
    afterEach(sinon.restore);
    it('returns the object created with the id', async () => {
      const motorcycle = await model.update(motorcycleMockUpdate._id, motorcycleMockUpdate as IMotorcycle);
      expect(motorcycle).to.be.deep.equal(motorcycleMockUpdate);
    });
    it('throws an error if the id is invalid', async () => {
      try {
        await model.update('ksdjfsçaldd', motorcycleMockUpdate as IMotorcycle);
      } catch (e: any) {
        expect(e).to.have.property('message', invalidId);
        expect(e).to.have.property('code', 400);
      }
    });
  });
  describe('delete method', () => {
    beforeEach(() => {
      sinon.stub(Model, 'deleteOne').resolves({ ...motorcycleMock, acknowledged: true, deletedCount: 1 });
    });
    afterEach(sinon.restore);
    it('returns the deleted object', async () => {
      const motorcycle = await model.delete(motorcycleMockWithId._id);
      expect(motorcycle).to.have.property('acknowledged', true);
      expect(motorcycle).to.have.property('deletedCount', 1);
    });
    it('throws an error if the id is invalid', async () => {
      try {
        await model.delete('jfsdhfkjsh');
      } catch (e: any) {
        expect(e).to.have.property('message', invalidId);
        expect(e).to.have.property('code', 400);
      }
    });
  });
});
