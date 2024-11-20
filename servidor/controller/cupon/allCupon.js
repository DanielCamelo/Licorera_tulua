const Cupon = require('../../models/cupon');

const obtenerCupones = async (req, res) => {
    try {
        // Obtener todos los cupones de la base de datos
        const cupones = await Cupon.find();

        if (cupones.length === 0) {
            return res.status(404).json({ message: "No se encontraron cupones." });
        }

        res.status(200).json(cupones);
    } catch (error) {
        console.error("Error al obtener los cupones:", error);
        res.status(500).json({ error: "Hubo un error al obtener los cupones." });
    }
};

module.exports = obtenerCupones ;
