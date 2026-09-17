export const testEmail = (value) => {
  const emailPattent = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattent.test(value);
};

export const testPassword = (value) => {
  const passwordPattent =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]{8,}$/;
  return passwordPattent.test(value);
};

export const passwordRegex = [
  {
    text: "signUp.rules.rule1",
    regex: /^.{8,}$/,
  },
  {
    text: "signUp.rules.rule2",
    regex: /[A-Z]/,
  },
  {
    text: "signUp.rules.rule3",
    regex: /[a-z]/,
  },
  {
    text: "signUp.rules.rule4",
    regex: /[^A-Za-z0-9]/,
  },
  {
    text: "signUp.rules.rule5",
    regex: /[0-9]/,
  },
];
