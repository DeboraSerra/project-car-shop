import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { IMotorcycle } from '../../../interfaces/IMotorcycle';
import MotorcycleModel from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/Motorcycle';
import { motorcycleMock, motorcycleMockUpdate, motorcycleMockWithId, motorcyclesMock } from '../../mocks/Motorcycles';

const notFound = 'Object not found';

describe('Motorcycle service layer', () => {
  const model = new MotorcycleModel();
  const service = new MotorcycleService(model);
  describe('getAll method', () => {
    beforeEach(() => {
      sinon.stub(model, 'read').resolves(motorcyclesMock as IMotorcycle[]);
    })
    afterEach(sinon.restore);
    it('returns an array', async () => {
      const motorcycles = await service.getAll();
      expect(motorcycles).to.be.an('array');
      expect(motorcycles).to.have.length(4);
    });
  });
  describe('getOne method', () => {
    const _id = '631ee56b94348cdea3cf5c85';
    beforeEach(() => {
      sinon.stub(model, 'readOne')
        .onCall(0).resolves(motorcycleMockWithId as IMotorcycle)
        .withArgs(_id).resolves(null);
    })
    afterEach(sinon.restore);
    it('returns the correct object', async () => {
      const motorcycle = await service.getOne(motorcycleMockWithId._id);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
    it('throws an error if no motorcycle is found', async () => {
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
      sinon.stub(model, 'create').resolves(motorcycleMockWithId as IMotorcycle);
    })
    afterEach(sinon.restore);
    it('returns the created object', async () => {
      const motorcycle = await service.create(motorcycleMock as IMotorcycle);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
    it('throws an error if the object is incorrect', async () => {
      try {
        await service.create({} as IMotorcycle);
      } catch (e: any) {
        expect(e).to.be.instanceOf(ZodError);
      }
    });
  });
  describe('update method', () => {
    const _id = '631ee56b94348cdea3cf5c85';
    beforeEach(() => {
      sinon.stub(model, 'update')
        .onCall(0).resolves(motorcycleMockUpdate as IMotorcycle)
        .withArgs(_id, motorcycleMockUpdate as IMotorcycle).resolves(null);
    });
    afterEach(sinon.restore);
    it('returns the updated object', async () => {
      const motorcycle = await service.update(motorcycleMockUpdate._id, motorcycleMockUpdate as IMotorcycle);
      expect(motorcycle).to.be.deep.equal(motorcycleMockUpdate);
    });
    it('throws an error if the object is incorrect', async () => {
      try {
        await service.update(motorcycleMockUpdate._id, {} as IMotorcycle);
      } catch (e: any) {
        expect(e).to.be.instanceOf(ZodError);
      }
    });
    it('throws an error if no motorcycle is found', async () => {
      try {
        await service.update(_id, motorcycleMockUpdate as IMotorcycle);
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
        .onCall(0).resolves(motorcycleMockWithId as IMotorcycle)
        .withArgs(_id).resolves(null);
      sinon.stub(model, 'delete')
        .onCall(0).resolves(motorcycleMockWithId as IMotorcycle)
        .withArgs(_id).resolves(null);
    });
    afterEach(sinon.restore);
    it('returns the deleted object', async () => {
      const motorcycle = await service.delete(motorcycleMockWithId._id);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
    it('throws an error if no motorcycle is found', async () => {
      try {
        await service.delete(_id);
      } catch (e: any) {
        expect(e).to.have.property('message', notFound);
        expect(e).to.have.property('code', 404);
      };
    });
  });
});
