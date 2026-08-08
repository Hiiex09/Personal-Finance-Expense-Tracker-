const normalizeEmail = (value) => {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase();
};

export const validateRegisterPayload = (payload = {}) => {
  const errors = {};

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = normalizeEmail(payload.email);
  const password = typeof payload.password === "string" ? payload.password : "";

  if (!name) {
    errors.name = "Name is required";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    normalizedData: {
      name,
      email,
      password,
    },
  };
};

export const validateLoginPayload = (payload = {}) => {
  const errors = {};

  const email = normalizeEmail(payload.email);
  const password = typeof payload.password === "string" ? payload.password : "";

  if (!email) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    normalizedData: {
      email,
      password,
    },
  };
};
