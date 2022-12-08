export const email = (email) => {
  if (!email || !email.length) return false;
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const number = (number) => {
  if (!number || !number.length) return false;
  return /^\d+$/.test(number);
};

export const mobile = (mobile) => {
  if (!mobile || !mobile.length) return false;
  return /^\d{10}$/.test(mobile);
};

export const containsSpecialCharacter = (text) => {
  return /[@#%&]/.test(text);
};
