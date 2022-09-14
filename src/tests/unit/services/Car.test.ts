import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ICar } from '../../../interfaces/ICar';
import CarModel from '../../../models/Cars';
import CarService from '../../../services/Car';
import { carMock, carMockUpdate, carMockWithId, carsMock } from '../../mocks/Cars';

const notFound = 'Object not found';

describe('Car service layer', () => {
  const model = new CarModel();
  const service = new CarService(model);
  describe('getAll method', () => {
    beforeEach(() => {
      sinon.stub(model, 'read').resolves(carsMock);
    })
    afterEach(sinon.restore);
    it('returns an array', async () => {
      const cars = await service.getAll();
      expect(cars).to.be.an('array');
      expect(cars).to.have.length(4);
    });
  });
  describe('getOne method', () => {
    const _id = '631ee56b94348cdea3cf5c85';
    beforeEach(() => {
      sinon.stub(model, 'readOne')
        .onCall(0).resolves(carMockWithId)
        .withArgs(_id).resolves(null);
    })
    afterEach(sinon.restore);
    it('returns the correct object', async () => {
      const car = await service.getOne(carMockWithId._id);
      expect(car).to.be.deep.equal(carMockWithId);
    });
    it('throws an error if no car is found', async () => {
      try {
        await service.getOne(_id);
      } catch (e: any) {
        expect(e).to.have.property('message', notFound);
        expect(e).to.have.property('code', 404);
      };
    });
  });
  describe('create method', () => {
    beforeEach(() => {
      sinon.stub(model, 'create').resolves(carMockWithId);
    })
    afterEach(sinon.restore);
    it('returns the created object', async () => {
      const car = await service.create(carMock);
      expect(car).to.be.deep.equal(carMockWithId);
    });
    it('throws an error if the object is incorrect', async () => {
      try {
        await service.create({} as ICar);
      } catch (e: any) {
        expect(e).to.be.instanceOf(ZodError);
      }
    });
  });
  describe('update method', () => {
    const _id = '631ee56b94348cdea3cf5c85';
    beforeEach(() => {
      sinon.stub(model, 'update')
        .onCall(0).resolves(carMockUpdate)
        .withArgs(_id, carMockUpdate).resolves(null);
    });
    afterEach(sinon.restore);
    it('returns the updated object', async () => {
      const car = await service.update(carMockUpdate._id, carMockUpdate);
      expect(car).to.be.deep.equal(carMockUpdate);
    });
    it('throws an error if the object is incorrect', async () => {
      try {
        await service.update(carMockUpdate._id, {} as ICar);
      } catch (e: any) {
        expect(e).to.be.instanceOf(ZodError);
      }
    });
    it('throws an error if no car is found', async () => {
      try {
        await service.update(_id, carMockUpdate);
      } catch (e: any) {
        expect(e).to.have.property('message', notFound);
        expect(e).to.have.property('code', 404);
      };
    });
  });
  describe('delete method', () => {
    const _id = '631ee56b94348cdea3cf5c85';
    beforeEach(() => {
      sinon.stub(model, 'readOne')
        .onCall(0).resolves(carMockWithId)
        .withArgs(_id).resolves(null);
      sinon.stub(model, 'delete')
        .onCall(0).resolves(carMockWithId)
        .withArgs(_id).resolves(null);
    });
    afterEach(sinon.restore);
    it('returns the deleted object', async () => {
      const car = await service.delete(carMockWithId._id);
      expect(car).to.be.deep.equal(carMockWithId);
    });
    it('throws an error if no car is found', async () => {
      try {
        await service.delete(_id);
      } catch (e: any) {
        expect(e).to.have.property('message', notFound);
        expect(e).to.have.property('code', 404);
      };
    });
  });
});
