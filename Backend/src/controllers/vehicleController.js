const service = require("../services/vehicleService");
const createVehicle = async (req, res, next) => { try { res.status(201).json(await service.createVehicle(req.body)); } catch (err) { next(err); } };
const getVehicles = async (req, res, next) => { try { res.json(await service.getVehicles()); } catch (err) { next(err); } };
const getVehicle = async (req, res, next) => { try { res.json(await service.getVehicle(req.params.id)); } catch (err) { next(err); } };
const updateVehicle = async (req, res, next) => { try { res.json(await service.updateVehicle(req.params.id, req.body)); } catch (err) { next(err); } };
const deleteVehicle = async (req, res, next) => { try { await service.deleteVehicle(req.params.id); res.status(204).send(); } catch (err) { next(err); } };
module.exports = { createVehicle, getVehicles, getVehicle, updateVehicle, deleteVehicle };
