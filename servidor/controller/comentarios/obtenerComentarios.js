const comentarioModel = require("../../models/comentarios");

const getComentariosByProductController = async (request, response) => {
    const { productId } = request.params; // Obtener el productId desde los parámetros de la ruta

    try {
        // Buscar los comentarios asociados a este producto
        const comentarios = await comentarioModel.find({ productId }).populate('userId', 'name email'); // Si quieres incluir detalles del usuario que comentó

        // Verificar si el producto tiene comentarios
        if (comentarios.length === 0) {
            return response.status(404).json({
                message: "No hay comentarios para este producto"
            });
        }

        // Retornar los comentarios encontrados
        return response.status(200).json({
            data: comentarios,
            success: true
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            message: "Hubo un error al obtener los comentarios"
        });
    }
};

module.exports = getComentariosByProductController;
