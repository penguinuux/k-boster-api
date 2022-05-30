import * as yup from "yup";

const createDvdSchema = yup
  .object()
  .shape({
    dvds: yup.array().of(
      yup.object().shape({
        name: yup.string().required(),
        duration: yup.string().required(),
        quantity: yup.number().required(),
        price: yup.number().required(),
      })
    ),
  })
  .required();

const serializedCreatedDvdSchema = yup
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
  .required();

export { createDvdSchema, serializedCreatedDvdSchema };
