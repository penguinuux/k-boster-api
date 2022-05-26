import * as yup from "yup";

const createdUserSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().lowercase().email().required(),
  password: yup.string(),
  is_admin: yup.boolean().default(false).optional(),
});

const serializedCreatedUser = yup.object().shape({
  user_id: yup.string().uuid().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  is_admin: yup.boolean().required(),
});

export { createdUserSchema, serializedCreatedUser };
