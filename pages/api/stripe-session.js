const stripe = require("stripe")(
  process.env.STRIPE_SECRET_KEY,
);

async function CreateStripeSession(req, res) {
  const { item, totalAmount } = req.body;

  const redirectURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/checkout"
      : "https://stripe-checkout-next-js-demo.vercel.app";

  const transformed = [];

  item.map((item) => {
    const transformedItem = {
      price_data: {
        currency: "inr",
        product_data: {
          images: [
            `${process.env.RESTFUL_API}/image/${item.image}`,
          ],
          name: item.title,
        },
        unit_amount: item.price * 100,
      },
      description: item.description,
      quantity: item.items,
    };

    transformed.push(transformedItem);
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: transformed,
    mode: "payment",
    success_url: redirectURL + "?status=success",
    cancel_url: redirectURL + "?status=cancel",
    metadata: {
      images: `${process.env.RESTFUL_API}/image/${item.image}`,
    },
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
  });

  res.json({ id: session.id });
}

export default CreateStripeSession;
