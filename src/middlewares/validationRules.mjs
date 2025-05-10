import { body } from 'express-validator';

export const validationDataCountry = () => [

    body('countryName')
        .exists()
        .trim()
        .notEmpty().withMessage('El nombre del país es requerido.')
        .isString().withMessage('El nombre debe ser una cadena de caracteres.')
        .isLength({ min: 3, max: 90 }).withMessage('El país debe tener una cantidad de caracteres entre 3 y 90.'),

    body('countryCapital')
        .exists()
        .trim()
        .notEmpty().withMessage('El nombre de la capital es requerido.')
        .isArray().withMessage('Capital no es un array.'),
    body('countryCapital.*')
        .isString().withMessage('Cada capital debe ser una cadena de texto.')
        .isLength({ min: 3, max: 90 }).withMessage('Cada capital debe tener entre 3 y 90 caracteres.'),

    body('countryBorders')
        .exists()
        .trim()
        .notEmpty().withMessage('Debe ingresar las fronteras del país.')
        .isArray().withMessage('Fronteras debe ser un arreglo'),
    body('countryBorders.*')
        .isString().withMessage('Cada frontera debe ser una cadena de texto.')
        .matches(/^[A-Z]{3}$/).withMessage('Cada frontera debe ser un código de 3 letras mayúsculas'),

    body('countryArea')
        .exists()
        .trim()
        .notEmpty().withMessage('El área es requerida.')
        .isFloat({ gt: 0 }).withMessage('El área debe ser un número positivo.'),

    body('countryPopulation')
        .exists()
        .trim()
        .notEmpty().withMessage('La población debe ser ingresada.')
        .isInt({ gt: 0 }).withMessage('La población debe ser un entero positivo.'),

    body('countryGiniValue')
        .optional()
        .isFloat({ min: 0, max: 100 }).withMessage('Gini debe ser un numero entre 0 y 100.'),

]
