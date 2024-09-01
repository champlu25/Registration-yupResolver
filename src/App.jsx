import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef } from "react";
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
      .max(25, "Должно быть не больше 25 символов")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
        "Пароль должен содержать хотя бы одну букву, одну цифру и один специальный символ"
      ),

    repeatedPassword: yup
      .string()
      .required("Повтор пароля обязателен")
      .oneOf([yup.ref("password"), null], "Пароли не совпадают"),
  })
  .required();

function App() {
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
    mode: "onChange",
  });

  const submitButtonRef = useRef(null);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleBlur = () => {
    if (!errors.email && !errors.password && !errors.repeatedPassword) {
      submitButtonRef.current.focus();
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.email && <p>{errors.email.message}</p>}
          <input
            type="email"
            placeholder="Введите email"
            {...register("email")}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <input
            type="password"
            placeholder="Введите пароль"
            {...register("password")}
          />
          {errors.repeatedPassword && <p>{errors.repeatedPassword.message}</p>}
          <input
            type="password"
            placeholder="Повторите пароль"
            {...register("repeatedPassword")}
            onBlur={handleBlur}
          />
          <button
            type="submit"
            className={styles.submitButton}
            ref={submitButtonRef}
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

export default App;
