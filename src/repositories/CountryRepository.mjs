import Country from "../models/Country.mjs";
import IRepository from "./IRepository.mjs";

class CountryRepository extends IRepository {

    async listCountries() {
        return await Country.find({
            "name": { $exists: true },
            creador: "Sayii"
        });
    }

    async findCountryById(id) {
        console.log(`Repository ID - ${id}`);
        const country = await Country.findById(id);
        /* console.log(`Repository Country -`, country); */

        return country;
    }

    async addCountry(countryData) {

        console.log('Repository - Datos Recibidos:', countryData);

        // 🔹 Crear nuevo país con solo los datos válidos
        const newCountry = new Country({
            "name.nativeName.spa.official": countryData.countryName,
            "capital": countryData.countryCapital,
            "borders": countryData.countryBorders,
            "area": countryData.countryArea,
            "population": countryData.countryPopulation,
            "gini": countryData.countryGini,
            "timezones": countryData.countryTimezones,
            "creador": countryData.creador,
        });
        console.log('Repository - Pais Instanciado', newCountry);
        /* console.log('Repository -', JSON.stringify(newCountry, null, 2)); */

        /* // Prueba de crear sin guardar en DB
        return newCountry; */

        return await newCountry.save();

    }

    async editCountry(id, countryData) {
        console.log('Ingreso editCountry');
        console.log('Repository - Datos Recibidos:', countryData);

        countryData = {
            "name.nativeName.spa.official": countryData.countryName,
            "capital": countryData.countryCapital,
            "borders": countryData.countryBorders,
            "area": countryData.countryArea,
            "population": countryData.countryPopulation,
            "gini": countryData.countryGini,
            "timezones": countryData.countryTimezones,
            "creador": countryData.creador,
        }

        console.log('Repository - Datos Transformados:', countryData);

        /* // Prueba de editar sin guardar en DB
        return 'Exitoso editCountry'; */

        const countryModified = await Country.findByIdAndUpdate(id,
        { $set: countryData },
        { new: true });
        console.log('Repository - Pais Modificado', countryModified);

        return countryModified;
    }

    async deleteCountry(id){
        const countryDeleted = await Country.findByIdAndDelete(id);
        console.log('Repository - Pais Eliminado', countryDeleted);

        return countryDeleted;
    }
}

export default new CountryRepository();