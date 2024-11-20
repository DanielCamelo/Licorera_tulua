const Cupon = require('../../models/cupon');

const eliminarCupon = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el cupón existe
        const cupon = await Cupon.findById(id);
        if (!cupon) {
            return res.status(404).json({ error: "Cupón no encontrado." });
        }

        // Eliminar el cupón
        await Cupon.findByIdAndDelete(id);

        res.status(200).json({ message: "Cupón eliminado exitosamente." });
    } catch (error) {
        console.error("Error al eliminar el cupón:", error);
        res.status(500).json({ error: "Hubo un error al eliminar el cupón." });
    }
};

module.exports = eliminarCupon ;
