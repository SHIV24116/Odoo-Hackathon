-- Normalize existing vehicle records to the same uppercase format as new records.
UPDATE "Vehicle"
SET
  "registrationNo" = UPPER("registrationNo"),
  "model" = UPPER("model"),
  "type" = UPPER("type");
