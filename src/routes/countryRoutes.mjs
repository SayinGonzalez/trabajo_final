import { validationDataCountry } from '../middlewares/validationRules.mjs';
import { handleValidationErrors } from '../middlewares/errorMiddleware.mjs';
import { parseCountryData } from '../middlewares/parseData.mjs';
import express from 'express';
import {
    addCountryController,
    editCountryController,
    deleteCountryController
} from '../controllers/countryController.mjs';

const router = express.Router();

// Ruta principal /paises/...

// Ruta para crear un país nuevo
router.post('/crear', parseCountryData, validationDataCountry(), handleValidationErrors, addCountryController);
// Ruta para modificar un país existente
router.put('/editar/:id', parseCountryData, validationDataCountry(), handleValidationErrors, editCountryController);
// Ruta para eliminar un país
router.delete('/eliminar/:id', deleteCountryController);

export default router;