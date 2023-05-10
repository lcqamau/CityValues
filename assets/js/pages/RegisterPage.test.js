import React from "react";
import { shallow } from "enzyme";
import RegisterPage from "./RegisterPage";

describe("<RegisterPage />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<RegisterPage />);
  });

  it("renders without crashing", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should have initial state with empty values", () => {
    expect(wrapper.state("user")).toEqual({
      FirstName: "",
      LastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });
    expect(wrapper.state("errors")).toEqual({
      FirstName: "",
      LastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });
  });

  it("should update state on input change", () => {
    const firstNameInput = wrapper.find('Field[name="FirstName"]');
    firstNameInput.simulate("change", {
      target: { name: "FirstName", value: "John" },
    });
    expect(wrapper.state("user")).toEqual({
      FirstName: "John",
      LastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });
  });

  it("should show an error if password and passwordConfirm do not match", () => {
    const form = wrapper.find("form");
    const passwordInput = wrapper.find('Field[name="password"]');
    const passwordConfirmInput = wrapper.find('Field[name="passwordConfirm"]');
    passwordInput.simulate("change", {
      target: { name: "password", value: "password1" },
    });
    passwordConfirmInput.simulate("change", {
      target: { name: "passwordConfirm", value: "password2" },
    });
    form.simulate("submit", {
      preventDefault: () => {},
    });
    expect(wrapper.state("errors")).toEqual({
      passwordConfirm:
        "Votre Confirmation de Mot de Passe n'est pas comforme avec le Mot de Passe",
    });
  });

  it("should submit form and redirect to login page on successful registration", async () => {
    const mockHistory = { replace: jest.fn() };
    const mockRegister = jest.fn();
    const user = {
      FirstName: "John",
      LastName: "Doe",
      email: "john.doe@example.com",
      password: "password",
      passwordConfirm: "password",
    };
    mockRegister.mockResolvedValueOnce(user);
    wrapper = shallow(<RegisterPage history={mockHistory} />);
    wrapper.instance().setState({ user });
    wrapper.instance().handleSubmit({ preventDefault: jest.fn() });
    expect(mockRegister).toHaveBeenCalledWith(user);
    expect(mockHistory.replace).toHaveBeenCalledWith("/login");
  });

  it("should show error message on failed registration", async () => {
    const mockToast = { error: jest.fn() };
    const mockRegister = jest.fn();
    const errors = {
      violations: [{ propertyPath: "email", message: "Email already exists" }],
    };
    mockRegister.mockRejectedValueOnce({ response: { data: { errors } } });
    wrapper = shallow(<RegisterPage toast={mockToast} />);
    wrapper.instance().handleSubmit({ preventDefault: jest.fn() });
    expect(mockRegister).toHaveBeenCalled();
    expect(wrapper.state("errors")).toEqual({ email: "Email already exists" });
    expect(mockToast.error).toHaveBeenCalledWith("Des erreurs dans votre Formulaire !😠");
  });
});