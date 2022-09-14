import { expect } from 'chai';
import * as sinon from 'sinon';
import CarModel from '../../../models/Cars';
import CarService from '../../../services/Car';
import CarController from '../../../controllers/Car';
import { Request, Response } from 'express';
import { carMock, carMockUpdate, carMockWithId, carsMock } from '../../mocks/Cars';

describe('Car controller layer', () => {
  const model = new CarModel();
  const service = new CarService(model);
  const controller = new CarController(service);
  const req = {} as Request;
  const res = {} as Response;
  describe('getAll method', () => {
    beforeEach(() => {
      sinon.stub(service, 'getAll').resolves(carsMock);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it('returns status 200', async () => {
      await controller.getAll(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMock)).to.be.true;
    });
  });
  describe('getOne method', () => {
    beforeEach(() => {
      sinon.stub(service, 'getOne').resolves(carMockWithId);
      req.params = {
        id: carMockWithId._id,
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it('returns status 200 and the correct object', async () => {
      await controller.getOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });
  describe('create method', () => {
    beforeEach(() => {
      sinon.stub(service, 'create').resolves(carMockWithId);
      req.body = carMock;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it('returns status 201 and the correct object', async () => {
      await controller.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });
  describe('update method', () => {
    beforeEach(() => {
      sinon.stub(service, 'update').resolves(carMockUpdate);
      req.params = { id: carMockWithId._id };
      req.body = carMockUpdate;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it('returns status 200 and the correct object', async () => {
      await controller.update(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockUpdate)).to.be.true;
    });
  });
  describe('delete method', () => {
    beforeEach(() => {
      sinon.stub(service, 'delete').resolves(carMockWithId);
      req.params = { id: carMockWithId._id };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    afterEach(sinon.restore);
    it('returns status 203 and the deleted object', async () => {
      await controller.delete(req, res);
      expect((res.status as sinon.SinonStub).calledWith(203)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });
});
