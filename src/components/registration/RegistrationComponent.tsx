import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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

  const [userIdToEdit, setUserIdToEdit] = useState<string>("");
  const [user_id, setUser_id] = useState<string>("");

  const navigate = useNavigate();

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
      setUser_id(responseBody.user_id);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const editUser = () => {
    if (!userIdToEdit) return;
    navigate(`/editUser/${userIdToEdit}`);
    setUserIdToEdit("");
  };

  return (
    <div>
      <h2>Formularz rejestracji użytkownika</h2>
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
      {user_id && <h4>Twoje id to {user_id}</h4>}

      <h1>Edycja uzytkownika</h1>
      <form onSubmit={editUser}>
        <input
          type="text"
          placeholder="edit user"
          value={userIdToEdit}
          onChange={(e) => setUserIdToEdit(e.target.value)}
        />
        <button type="submit" disabled={!userIdToEdit}>
          edit
        </button>
      </form>
    </div>
  );
};

export default RegistrationComponent;
