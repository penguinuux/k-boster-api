import * as yup from "yup";

const createUserSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().lowercase().email().required(),
  password: yup.string(),
  is_admin: yup.boolean().default(false).optional(),
});

const serializedCreatedUserSchema = yup.object().shape({
  user_id: yup.string().uuid().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  is_admin: yup.boolean().required(),
});

export { createUserSchema, serializedCreatedUserSchema };
