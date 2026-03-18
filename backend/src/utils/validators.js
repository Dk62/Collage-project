const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

const isStrongPassword = (password) => typeof password === "string" && password.length >= 6;

module.exports = { isEmailValid, isStrongPassword };
