const userModel = require("../../models/userModel");
const bcrypt = require('bcrypt');

async function updateUserDetailsController(req, res) {
  try {
    const { name, age , email , phone , password } = req.body; // No incluimos `status` aquí

    if (!req.userId) {
      console.error("Falta el ID de usuario en la solicitud.");
      return res.status(401).json({
        message: "No estás autorizado para realizar esta acción. Falta el ID de usuario.",
        error: true,
        success: false,
      });
    }

    console.log("Buscando usuario con ID:", req.userId);
    const user = await userModel.findById(req.userId);

    if (!user) {
      console.error("Usuario no encontrado con ID:", req.userId);
      return res.status(404).json({
        message: "Usuario no encontrado. Verifica que el ID de usuario sea correcto.",
        error: true,
        success: false,
      });
    }

    user.name = name || user.name;
    user.age = age || user.age;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    if (password) {
      try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      } catch (hashError) {
        console.error("Error al cifrar la contraseña:", hashError);
        return res.status(500).json({
          message: "Error al cifrar la contraseña.",
          error: true,
          success: false,
        });
      }
    }

    await user.save();
    console.log("Usuario actualizado exitosamente:", user);

    return res.status(200).json({
      data: user,
      message: "Datos del usuario actualizados exitosamente.",
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Error al actualizar los datos del usuario:", err);
    return res.status(500).json({
      message: "Error interno del servidor al actualizar los datos del usuario.",
      error: true,
      success: false,
    });
  }
}

module.exports = updateUserDetailsController;