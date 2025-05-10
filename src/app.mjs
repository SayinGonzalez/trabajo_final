import express from 'express';
import session from 'express-session';
import { connectDB } from './config/dbConfig.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from "method-override";
import expressLayouts from 'express-ejs-layouts';
// Import rutas
import countryRoutes from './routes/countryRoutes.mjs';
import viewRoutes from './routes/viewRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;


/* Convierte la URL del módulo en una ruta de archivo (fileURLToPath(import.meta.url))
y obtiene el directorio del archivo actual (path.dirname(...)) */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Configuración de EJS como el motor de vistas
app.set('view engine', 'ejs');
/* Forma la ruta absoluta hacia views/, sin importar desde dónde se ejecute el script. */
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: 'appCountries', // Poné algo único
    resave: false, // No guardes la sesión si no se modificó
    saveUninitialized: false, // No guardes sesiones vacías
    cookie: {
        maxAge: 1000 * 60 * 60 * 1 // 1 hora (en milisegundos)
    }
}));

// Configurar express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout'); // Archivo base de layout

// Middleware para parsear JSON
app.use(express.json());
// Para procesar datos del formulario
// El formulario está enviando datos en formato application/x-www-form-urlencoded por defecto.
app.use(express.urlencoded({ extended: true }));
// Configuración de method-override
app.use(methodOverride("_method"));
// Configuración de express.static
app.use(express.static(path.join(__dirname, "public")));

// Conexión a MongoDB
connectDB();

// Configuración de rutas
app.use('/paises', countryRoutes);
app.use('/', viewRoutes);

//Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ mensaje: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor ejecutándose en el puerto: ${PORT}`);
    console.log('Desde render - https://spring-4-tp-1-server.onrender.com/index');
    console.log(`Desde VSC - http://localhost:${PORT}/`);
});