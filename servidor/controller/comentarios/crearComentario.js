const comentarioModel = require("../../models/comentarios");
const userModel = require("../../models/userModel");
const productModel = require("../../models/productModel");  // Asegúrate de incluir este modelo

const createComentarioController = async (request, response) => {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const { productName, comentario, calificacion } = request.body; // Ahora se recibe el nombre del producto
        const userId = request.userId; // Obtener el userId desde el token de autenticación o sesión

        // Verificar si los datos necesarios están presentes
        if (!productName || !comentario || !calificacion) {
            return response.json({
                message: "Faltan datos obligatorios: productName, comentario y calificación.",
                success: false,
                error: true
            });
        }

        // Buscar el producto por su nombre
        const product = await productModel.findOne({ name: productName }); // Buscamos el producto por su nombre
        if (!product) {
            return response.json({
                message: "Producto no encontrado.",
                success: false,
                error: true
            });
        }

        const productId = product._id; // Obtenemos el productId del producto encontrado

        // Verificar si el usuario existe
        const user = await userModel.findById(userId);
        if (!user) {
            return response.json({
                message: "Usuario no encontrado.",
                success: false,
                error: true
            });
        }

        // Crear el nuevo comentario
        const newComentario = new comentarioModel({
            productId,
            userId,
            comentario,
            calificacion
        });

        // Guardar el comentario en la base de datos
        await newComentario.save();

        // Responder con éxito
        return response.json({
            data: newComentario,
            message: "Comentario creado exitosamente",
            success: true,
            error: false
        });

    } catch (error) {
        console.error(error);
        return response.json({
            message: error?.message || "Hubo un error al crear el comentario.",
            success: false,
            error: true
        });
    }
};

module.exports = createComentarioController;


