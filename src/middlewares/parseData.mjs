export const parseCountryData = (req, res, next) => {

    console.log("Datos recibidos:", req.body);

    if (typeof req.body.countryCapital == 'string') {
        req.body.countryCapital = req.body.countryCapital.trim().split(',').map(capital => capital.trim());

        console.log(req.body.countryCapital);
    }

    if (typeof req.body.countryBorders == 'string') {
        req.body.countryBorders = req.body.countryBorders.trim().split(',').map(border => border.trim());

        console.log(req.body.countryBorders);
    }

    if (typeof req.body.countryGiniYear === 'string' && typeof req.body.countryGiniValue === 'string') {

        const year = req.body.countryGiniYear.trim();
        const value = req.body.countryGiniValue.trim();

        if ((year === '' || year == '0') && (value === '' || value === 'Sin Datos')) {
            req.body.countryGini = undefined;
        } else {
            req.body.countryGini = { [year]: parseFloat(value) };
        }

        console.log(req.body.countryGini);
    }

    if (typeof req.body.countryTimezones == 'string') {
        req.body.countryTimezones = req.body.countryTimezones.trim().split(',').map(timezone => timezone.trim());
        
        console.log(req.body.countryTimezones);
    }

    next();
}