import * as yup from "yup";

const serializeCartSchema = yup.object().shape({
  cart_id: yup.string().required(),
  paid: yup.boolean().required(),
  total: yup.number().required(),
  dvds: yup.array().of(
    yup.object().shape({
      dvd_id: yup.string().required(),
      name: yup.string().required(),
      duration: yup.string().required(),
    })
  ),
});

export { serializeCartSchema };
