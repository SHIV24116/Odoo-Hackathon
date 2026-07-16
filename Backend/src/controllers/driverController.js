const service = require("../services/driverService");
const createDriver = async (req, res, next) => { try { res.status(201).json(await service.createDriver(req.body)); } catch (err) { next(err); } };
const getDrivers = async (req, res, next) => { try { res.json(await service.getDrivers()); } catch (err) { next(err); } };
const getDriver = async (req, res, next) => { try { res.json(await service.getDriver(req.params.id)); } catch (err) { next(err); } };
const updateDriver = async (req, res, next) => { try { res.json(await service.updateDriver(req.params.id, req.body)); } catch (err) { next(err); } };
const deleteDriver = async (req, res, next) => { try { await service.deleteDriver(req.params.id); res.status(204).send(); } catch (err) { next(err); } };
module.exports = { createDriver, getDrivers, getDriver, updateDriver, deleteDriver };
