import express from 'express';
import {
    listCountriesController,
    findCountryByIdController
} from '../controllers/countryController.mjs';

const router = express.Router();

// Ruta principal /...

// Vista Index
router.get("/", (req, res) => {
    res.render("index", { title: 'Index' });
});

// Vista Dasboard para Listar los Paises
router.get("/dashboard", listCountriesController);

// Vista para Crear Nuevo País 
router.get("/nuevo/pais", (req, res) => {
    res.render("addCountry", { title: 'Nuevo Pais' }); // Renderiza addCountry.ejs
});

// Vista para Editar un País
router.get("/editar/pais/:id", findCountryByIdController);

export default router;