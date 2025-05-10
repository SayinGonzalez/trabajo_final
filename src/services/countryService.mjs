import CountryRepository from '../repositories/CountryRepository.mjs'

export async function listCountriesService() {

    const countriesData = await CountryRepository.listCountries();

    const countries = countriesData.map(country => {
        /* const country = doc.toObject(); // 🔁 Convertir a objeto plano */

        // Obtener Gini si existe
        let gini = 'Sin Datos';
        if (country.gini && Object.keys(country.gini).length > 0) {
            const [year, value] = Object.entries(country.gini)[0];
            gini = { year, value };
        }

        return {
            id: country._id,
            name: country.name?.nativeName?.spa?.official || country.name?.official || 'Sin Datos',
            capital: country.capital?.length ? country.capital : 'Sin Datos',
            borders: country.borders?.length ? country.borders : ['Sin Datos'],
            area: country.area || 'Sin Datos',
            population: country.population || 'Sin Datos',
            gini,
            timezones: country.timezones?.length ? country.timezones : 'Sin Datos',
            creador: country.creador || 'Desconocido',
        };
    });

    /* console.log(countries); */
    console.log(countries.length);

    return countries;

    /*
        const giniMean = countries.forEach(country => {
           
        });
    
        const totales = countries.forEach(country => {
            totales += country.population + country.area + giniMean
        }, return totales);
    
        return { countries, totales }; */

}

export async function findCountryByIdService(id) {
    console.log(`Service ID - ${id}`);
    const countryData = await CountryRepository.findCountryById(id);
    console.log('Retorno a Service desde Repository');

    const country = {
        id: countryData._id,
        name: countryData.name?.nativeName?.spa?.official || countryData.name?.official || 'Sin Datos',
        capital: countryData.capital?.length ? countryData.capital : 'Sin Datos',
        borders: countryData.borders?.length ? countryData.borders : ['Sin Datos'],
        area: countryData.area || 'Sin Datos',
        population: countryData.population || 'Sin Datos',
        gini: (countryData.gini && countryData.gini !== 'Sin Datos') ? {
            year: Number(Object.keys(countryData.gini)[0]),
            value: Object.values(countryData.gini)[0]
        } : {
            year: 0,
            value: 'Sin Datos'
        },
        timezones: countryData.timezones?.length ? countryData.timezones : 'Sin Datos',
        creador: countryData.creador || 'Desconocido',
    }

    console.log(`Service Country -`, country);

    return country;
}

export async function addCountryService(countryData) {
    return await CountryRepository.addCountry(countryData);
}

export async function editCountryService(id, countryData) {
    console.log('Ingreso editCountryService');
    return await CountryRepository.editCountry(id, countryData);
}

export async function deleteCountryService(id) {
    return await CountryRepository.deleteCountry(id);
}