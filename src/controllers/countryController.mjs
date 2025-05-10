import {
    listCountriesService,
    addCountryService,
    editCountryService,
    findCountryByIdService,
    deleteCountryService
} from '../services/countryService.mjs'

export async function listCountriesController(req, res) {
    try {
        const countries = await listCountriesService();

        const successMessage = req.session.successMessage;
        const errorMessage = req.session.errorMessage;
        req.session.successMessage = null;
        req.session.errorMessage = null;

        res.render('dashboard', {
            countries,
            successMessage,
            errorMessage,
            title: 'Countries'
        });

    } catch (error) {

        const errorMessage = error.message || 'Ocurrió un error inesperado';
        res.render('dashboard', { errorMessage, title: 'Countries' });

    }
}


export async function findCountryByIdController(req, res) {

    try {

        const { id } = req.params;
        console.log(`Controller ID - ${id}`);

        const countryFound = await findCountryByIdService(id);
        if (!countryFound) {
            req.session.errorMessage = 'No se encontró ninguna coincidencia.';
            res.redirect('/dashboard');
        };

        // console.log('==============================================');
        // console.log('Retorno a Controller desde Service');
        // console.log(`Countroller Country -`, countryFound);

        res.render("editCountry", { country: countryFound, title: 'Editar País' });

    } catch (error) {

        console.log('Ingreso por Catch');
        req.session.errorMessage = `País no encontrado - ${error.message}` || 'Ocurrió un error inesperado';
        res.redirect('/dashboard');

    }

}

export async function addCountryController(req, res) {

    try {

        const countryData = req.body;
        /* console.log('Controller - Datos Recibidos:', countryData); */
        const countryCreated = await addCountryService(countryData);
        if (!countryCreated) {
            req.session.errorMessage = 'Hubo un error durante la creación del país';
            res.redirect('/dashboard');
            /* return res.status(404).send({ mensaje: 'Hubo un error durante la creación del país' }); */
        }

        req.session.successMessage = 'País creado exitosamente!';
        res.redirect('/dashboard');
        /* res.status(200).json(countryCreated); */

    } catch (error) {

        console.log('Ingreso por Catch');
        req.session.errorMessage = `Error al crear el País - ${error.message}` || 'Ocurrió un error inesperado';
        res.redirect('/dashboard');
    }

}

export async function editCountryController(req, res) {

    try {

        // console.log('Ingreso editCountryController');
        const { id } = req.params;
        const countryData = req.body;

        const countryModified = await editCountryService(id, countryData);
        if (!countryModified) {
            req.session.errorMessage = 'Hubo un error durante al intentar editar el país';
            res.redirect('/dashboard');
        }

        req.session.successMessage = 'País editado exitosamente!';
        res.redirect('/dashboard');

    } catch (error) {

        console.log('Ingreso por Catch');
        req.session.errorMessage = `Error al editar el País - ${error.message}` || 'Ocurrió un error inesperado';
        res.redirect('/dashboard');

    }

}

export async function deleteCountryController(req, res) {

    try {

        const { id } = req.params;
        const countryDeleted = await deleteCountryService(id);

        console.log('Controller - Country Deleted:', countryDeleted);

        req.session.successMessage = 'País eliminado exitosamente!';
        res.status(200).end();

    } catch (error) {

        console.log('Ingreso por Catch');
        req.session.errorMessage = `Error al eliminar el País - ${error.message}` || 'Ocurrió un error inesperado';
        res.status(500).end();
    }

}