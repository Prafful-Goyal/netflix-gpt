export const checkValidData = (email, password) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  ); //If this "regex" will pass it will give either "true" inside it or it give "false" inside it

  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  // const isNameValid = /^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(name);

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid) return "Password is not valid";
  // if (!isNameValid) return "Name is not valid";

  return null; // If I get null that means "No Error" and If I get some "String" inside it that means "Email" is not valid or "Password" is not valid or "Name" is not valid
};
