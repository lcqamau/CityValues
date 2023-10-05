import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import Field from "../components/forms/Field";
import usersAPI from "../services/usersAPI";
import MyAddress from "../components/MyAddress.jsx";


const RegisterPage = ({ history }) => {
  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiErrors = {};
    if (user.password !== user.passwordConfirm) {
      apiErrors.passwordConfirm =
        "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe";
      setErrors(apiErrors);
      toast.error("Des erreurs dans votre formulaire !😠");
      return;
    }

    try {
      await usersAPI.register(user);
      setErrors({});
      toast.success("Vous êtes désormais inscrit !😄");
      history.replace("/login");
    } catch (error) {
      console.log(error.response);

      const { violations } = error.response.data;

      if (violations) {
        violations.forEach((violations) => {
          apiErrors[violations.propertyPath] = violations.message;
        });
        setErrors(apiErrors);
      }
      toast.error("Des erreurs dans votre formulaire !😠");
    }
  };

  return (
    <>
      <h1>Inscription</h1>

      <form onSubmit={handleSubmit}>
        <Field
          name="FirstName"
          label="Prénom"
          placeholder="Votre prénom"
          error={errors.FirstName}
          value={user.FirstName}
          onChange={handleChange}
        />
        &nbsp;
        <Field
          name="LastName"
          label="Nom"
          placeholder="Votre nom"
          error={errors.LastName}
          value={user.FastName}
          onChange={handleChange}
        />
        &nbsp;
        <Field
          name="email"
          label="Email"
          placeholder="Votre e-mail"
          error={errors.email}
          value={user.email}
          onChange={handleChange}
        />
        &nbsp;
        <div>
        <p>Adresse</p>
        </div>
        <MyAddress/>
        &nbsp;
        <Field
          name="password"
          type="password"
          label="Password"
          placeholder="Votre mot de passe"
          error={errors.password}
          value={user.password}
          onChange={handleChange}
        />
        &nbsp;
        <Field
          name="passwordConfirm"
          type="password"
          label="PasswordConfirm"
          placeholder="Confirmez votre mot de passe"
          error={errors.passwordConfirm}
          value={user.passwordConfirm}
          onChange={handleChange}
        />
        &nbsp;
        <div className="mb-5 mt-4 form-group">
          <button type="submit" className="btn btn-outline-success">
            Inscription
          </button>
          <Link to="/login" className="btn btn-link">
            J'ai Déjà un Compte
          </Link>
        </div>
      </form>
    </>
  );
};

export default RegisterPage;