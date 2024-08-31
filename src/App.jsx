import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./registration.module.css";

const fieldsSchema = yup
  .object({
    email: yup
      .string()
      .required("Email обязателен")
      .min(6, "Должно быть более 6 символов")
      .max(50, "Должно быть не более 50 символов")
      .email("Проверьте правильность введения почты"),

    password: yup
      .string()
      .required("Пароль обязателен")
      .min(8, "Должно быть более 8 символов")
      .max(25, "Должно быть не больее 25 символов"),

    repeatedPassword: yup
      .string()
      .required("Повтор пароля обязателен")
      .oneOf([yup.ref("password"), null], "Пароли не совпадают"),
  })

  .required();

function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      repeatedPassword: "",
    },
    resolver: yupResolver(fieldsSchema),
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>{errors.email?.message}</p>
          <input
            type="email"
            placeholder="Введите email"
            {...register("email")}
          />
          <p>{errors.password?.message}</p>
          <input
            type="password"
            name="password"
            placeholder="Введите пароль"
            {...register("password")}
          />
          <p>{errors.repeatedPassword?.message}</p>
          <input
            type="password"
            name="repeatedPassword"
            placeholder="Повторите пароль"
            {...register("repeatedPassword")}
          />
          <button
            type="submit"
            className={styles.submitButton}
            disabled={
              !!errors.email || !!errors.password || errors.repeatedPassword
            }
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </>
  );
}

export default Registration;
