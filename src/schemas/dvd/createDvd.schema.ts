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

const serializedCreatedDvdSchema = yup.object().shape({
  dvd_id: yup.string().uuid().required(),
  name: yup.string().required(),
  duration: yup.string().required(),
});

export { createDvdSchema, serializedCreatedDvdSchema };
