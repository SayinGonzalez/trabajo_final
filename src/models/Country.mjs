import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
    name: {
      common: String,
      official: String,
      nativeName: mongoose.Schema.Types.Mixed, // Puede ser un objeto con claves dinámicas como "spa", "grn", etc.
    },
    independent: Boolean,
    status: String,
    unMember: Boolean,
    currencies: mongoose.Schema.Types.Mixed, // claves dinámicas como "PYG", "USD"
    capital: [String],
    region: String,
    subregion: String,
    languages: mongoose.Schema.Types.Mixed, // claves dinámicas como "spa", "eng"
    latlng: [Number],
    landlocked: Boolean,
    borders: [String],
    area: Number,
    flag: String,
    maps: {
      googleMaps: String,
      openStreetMaps: String,
    },
    population: Number,
    gini: mongoose.Schema.Types.Mixed, // puede tener distintos años como claves: "2019": 45.7
    fifa: String,
    timezones: [String],
    continents: [String],
    flags: {
      png: String,
      svg: String,
      alt: String,
    },
    startOfWeek: String,
    capitalInfo: {
      latlng: [Number],
    },
    creador: {type: String, default: 'Sayii'}
  });

  function cleanObject(obj) {
    for (const key in obj) {
      const value = obj[key];
  
      if (
        value === null ||
        value === undefined ||
        (typeof value === 'string' && value.trim() === '') ||
        (Array.isArray(value) && value.length === 0)
      ) {
        delete obj[key];
      } else if (typeof value === 'object') {
        cleanObject(value); // limpiar recursivamente
  
        // Si luego de limpiar un objeto anidado queda vacío, eliminarlo
        if (Object.keys(value).length === 0) {
          delete obj[key];
        }
      }
    }
  }
  
  countrySchema.pre('save', function (next) {
    cleanObject(this._doc);
    next();
  });
  
  /* // Hook 'pre' para limpiar datos antes de guardarlos
  countrySchema.pre('save', function (next) {
    console.log("Ingreso al hook pre('save')");
    
    const country = this._doc;
  
    // Limpiar campos vacíos (arrays vacíos, strings vacíos, null, undefined)
    for (const key in country) {
      const value = country[key];
  
      if (
        (Array.isArray(value) && value.length === 0) || // eliminar arrays vacíos
        (typeof value === 'string' && value.trim() === '') || // eliminar strings vacíos
        value === null || value === undefined // eliminar valores nulos o indefinidos
      ) {
        country[key] = undefined; // marcar el campo para que no se guarde
      }
    }
    
    console.log('Hook -', JSON.stringify(country, null, 2));

    next();
  }); */

const Country = mongoose.model('Country', countrySchema, 'Grupo-06');
export default Country;