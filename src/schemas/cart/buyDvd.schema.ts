import * as yup from "yup";

const serializedBuyDvdSchema = yup.object().shape({
  cart_id: yup.string().uuid().required(),
  paid: yup.boolean().required(),
  total: yup.number().required(),
  dvds: yup
    .array()
    .of(
      yup.object().shape({
        dvd_id: yup.string().uuid().required(),
        name: yup.string().required(),
        duration: yup.string().required(),
        dvd_stock: yup.object().shape({
          stock_id: yup.string().required(),
          price: yup.number().required(),
          quantity: yup.number().required(),
        }),
      })
    )
    .required(),
});

export { serializedBuyDvdSchema };
