async function deleteCountry(id) {
    console.log("deleteCountries.js cargado correctamente");

    if (confirm("¿Estás seguro de que deseas eliminar este país?")) {
        try {
            const response = await fetch(`/paises/eliminar/${id}`, { method: "DELETE" });

            if (response.ok) {
                /* alert('¡Superhéroe eliminado exitosamente!'); */
                window.location.href = "/dashboard"; // Redirigir después de eliminar
            } else {
                alert("Error al eliminar el país");
            }

        } catch (error) {
            console.error("Error:", error);
        }
    }
}
