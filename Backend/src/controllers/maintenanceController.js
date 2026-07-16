const service = require("../services/maintenanceService");
const createMaintenance = async (req, res, next) => { try { res.status(201).json(await service.createMaintenance(req.body)); } catch (err) { next(err); } };
const getMaintenances = async (req, res, next) => { try { res.json(await service.getMaintenances()); } catch (err) { next(err); } };
const getMaintenance = async (req, res, next) => { try { res.json(await service.getMaintenance(req.params.id)); } catch (err) { next(err); } };
const updateMaintenance = async (req, res, next) => { try { res.json(await service.updateMaintenance(req.params.id, req.body)); } catch (err) { next(err); } };
const deleteMaintenance = async (req, res, next) => { try { await service.deleteMaintenance(req.params.id); res.status(204).send(); } catch (err) { next(err); } };
module.exports = { createMaintenance, getMaintenances, getMaintenance, updateMaintenance, deleteMaintenance };
