const Cupon = require('../../models/cupon');

const crearCupon = async (req, res) => {
    try {
        const { titulo, descripcion, codigo } = req.body;

        // Validación básica
        if (!titulo || !descripcion || !codigo) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        // Verificar si el código ya existe
        const codigoExistente = await Cupon.findOne({ codigo });
        if (codigoExistente) {
            return res.status(400).json({ error: "El código ya está en uso." });
        }

        // Crear un nuevo cupón
        const nuevoCupon = new Cupon({ titulo, descripcion, codigo });
        const cuponGuardado = await nuevoCupon.save();

        res.status(201).json({ message: "Cupón creado exitosamente.", cupon: cuponGuardado });
    } catch (error) {
        console.error("Error al crear el cupón:", error);
        res.status(500).json({ error: "Hubo un error al crear el cupón." });
    }
};

module.exports =  crearCupon;
