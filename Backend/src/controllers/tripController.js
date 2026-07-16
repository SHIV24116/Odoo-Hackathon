const service = require("../services/tripService");
const createTrip = async (req, res, next) => { try { res.status(201).json(await service.createTrip(req.body)); } catch (err) { next(err); } };
const getTrips = async (req, res, next) => { try { res.json(await service.getTrips()); } catch (err) { next(err); } };
const getTrip = async (req, res, next) => { try { res.json(await service.getTrip(req.params.id)); } catch (err) { next(err); } };
const updateTrip = async (req, res, next) => { try { res.json(await service.updateTrip(req.params.id, req.body)); } catch (err) { next(err); } };
const deleteTrip = async (req, res, next) => { try { await service.deleteTrip(req.params.id); res.status(204).send(); } catch (err) { next(err); } };
module.exports = { createTrip, getTrips, getTrip, updateTrip, deleteTrip };
