import { expect } from 'chai';
import * as sinon from 'sinon';
import MotorcycleModel from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/Motorcycle';
import MotorcycleController from '../../../controllers/Motorcycle';
import { Request, Response } from 'express';
import { motorcycleMock, motorcycleMockUpdate, motorcycleMockWithId, motorcyclesMock } from '../../mocks/Motorcycles';
import { IMotorcycle } from '../../../interfaces/IMotorcycle';

describe('Car controller layer', () => {
  const model = new MotorcycleModel();
  const service = new MotorcycleService(model);
  const controller = new MotorcycleController(service);
  const req = {} as Request;
  const res = {} as Response;
  describe('getAll method', () => {
    beforeEach(() => {
      sinon.stub(service, 'getAll').resolves(motorcyclesMock as IMotorcycle[]);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it('returns status 200', async () => {
      await controller.getAll(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcyclesMock)).to.be.true;
    });
  });
  describe('getOne method', () => {
    beforeEach(() => {
      sinon.stub(service, 'getOne').resolves(motorcycleMockWithId as IMotorcycle);
      req.params = {
        id: motorcycleMockWithId._id,
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it('returns status 200 and the correct object', async () => {
      await controller.getOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
  });
  describe('create method', () => {
    beforeEach(() => {
      sinon.stub(service, 'create').resolves(motorcycleMockWithId as IMotorcycle);
      req.body = motorcycleMock;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it('returns status 201 and the correct object', async () => {
      await controller.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
  });
  describe('update method', () => {
    beforeEach(() => {
      sinon.stub(service, 'update').resolves(motorcycleMockUpdate as IMotorcycle);
      req.params = { id: motorcycleMockWithId._id };
      req.body = motorcycleMockUpdate;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it('returns status 200 and the correct object', async () => {
      await controller.update(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockUpdate)).to.be.true;
    });
  });
  describe('delete method', () => {
    beforeEach(() => {
      sinon.stub(service, 'delete').resolves(motorcycleMockWithId as IMotorcycle);
      req.params = { id: motorcycleMockWithId._id };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it('returns status 204 and the deleted object', async () => {
      await controller.delete(req, res);
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
  });
});
