import * as yup from "yup";

const serializedOrderSchema = yup
  .object()
  .shape({
    order_id: yup.string().required(),
    total: yup.number().required(),
    created_at: yup.date().required(),
    dvds: yup.array().of(
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
    ),
  })
  .required();

export { serializedOrderSchema };
