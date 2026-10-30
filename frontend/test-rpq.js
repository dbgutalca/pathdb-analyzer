import { validateRPQ, formatValidationErrors } from './src/utils/rpq-validator.js';

const res = validateRPQ("Sas");
console.log("Valid:", res.valid);
if (!res.valid) {
    console.log("Error string:", formatValidationErrors("Sas", res.errors));
}
