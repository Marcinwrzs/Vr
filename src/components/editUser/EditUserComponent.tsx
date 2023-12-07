import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Paths } from "../../layout/pages/Pages";

interface InputValue {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
}

interface UserData extends InputValue {
  user_id: string;
}

const EditUserComponent = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InputValue>();

  const { userId } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://vr-test.vendorobotics.com/api/users/${userId}`
        );

        if (!response.ok) {
          throw new Error(`Network error: ${response.status}`);
        }

        const fetchedUserData: UserData = await response.json();
        setUserData(fetchedUserData);

        setValue("name", fetchedUserData.name);
        setValue("surname", fetchedUserData.surname);
        setValue("email", fetchedUserData.email);
        setValue("phoneNumber", fetchedUserData.phoneNumber);
        setValue("dateOfBirth", fetchedUserData.dateOfBirth);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId, setValue]);

  const onSubmit: SubmitHandler<InputValue> = async (data) => {
    try {
      const response = await fetch(
        `https://vr-test.vendorobotics.com/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Network error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <h2>Formularz edycji użytkownika</h2>

      {userData ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Name:
            <input type="text" {...register("name")} />
          </label>
          <br />

          <label>
            Surname:
            <input type="text" {...register("surname")} />
          </label>
          <br />

          <label>
            Email:
            <input
              type="email"
              {...register("email", {
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
            <input type="text" {...register("phoneNumber")} />
          </label>
          <br />

          <label>
            Date of Birth:
            <input type="date" {...register("dateOfBirth")} />
          </label>
          <br />

          <button type="submit">Update User</button>
        </form>
      ) : (
        <div>
          <h1>No data. Please register</h1>
          <Link to={Paths.Registration}>Register</Link>
        </div>
      )}
    </div>
  );
};

export default EditUserComponent;
