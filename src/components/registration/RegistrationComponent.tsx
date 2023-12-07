import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface InputValue {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
}

const RegistrationComponent: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InputValue>();

  const onSubmit: SubmitHandler<InputValue> = async (data) => {
    try {
      const response = await fetch(
        "https://vr-test.vendorobotics.com/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Network error: ${response.status}`);
      }

      const responseBody = await response.json();
      console.log(`ID: ${responseBody.user_id}`);

      setValue("name", "");
      setValue("surname", "");
      setValue("email", "");
      setValue("phoneNumber", "");
      setValue("dateOfBirth", "");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name:
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </label>
        <br />

        <label>
          Surname:
          <input
            type="text"
            {...register("surname", { required: "Surname is required" })}
          />
          {errors.surname && <p>{errors.surname.message}</p>}
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </label>
        <br />

        <label>
          Phone Number:
          <input
            type="text"
            {...register("phoneNumber", {
              required: "Phone Number is required",
            })}
          />
          {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
        </label>
        <br />

        <label>
          Date of Birth:
          <input
            type="date"
            {...register("dateOfBirth", {
              required: "Date of Birth is required",
            })}
          />
          {errors.dateOfBirth && <p>{errors.dateOfBirth.message}</p>}
        </label>
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationComponent;
