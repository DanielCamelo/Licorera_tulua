const stripe = require("../../config/stripe");
const userModel = require("../../models/userModel");

const paymentController = async (request, response) => {
    try {
        const { cartItems } = request.body; // No necesitas recibir el cupón aquí

        console.log("Items en el carrito:", cartItems);

        const user = await userModel.findOne({ _id: request.userId });

        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shipping_rate: 'shr_1QMunbG7rlXhJKvGkWxcgVpy'
                }
            ],
            customer_email: user.email,
            line_items: cartItems.map((item) => {
                return {
                    price_data: {
                        currency: 'cop',
                        product_data: {
                            name: item.productId.productName,
                            images: item.productId.productImage,
                            metadata: {
                                productId: item.productId._id
                            }
                        },
                        unit_amount: item.productId.sellingPrice * 100
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1
                    },
                    quantity: item.quantity
                };
            }),
            shipping_address_collection: {
                allowed_countries: ['CO'] // Lista de países permitidos para dirección de envío
            },
            allow_promotion_codes: true, // Habilita la opción de ingresar un cupón
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`
        };

        const session = await stripe.checkout.sessions.create(params);

        response.status(303).json(session);
    } catch (error) {
        response.json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

module.exports = paymentController;
