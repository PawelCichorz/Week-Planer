export const emailValidate = (text: string) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g;
  if (re.test(text)) {
    return true;
  } else {
    return "Zły adres email";
  }
};

export const passwordValidate = (text: string) => {
  const low = /[a-z]/g;
  const row = /[A-Z]/g;
  const nums = /[1-9]/g;

  if (low.test(text) && row.test(text) && nums.test(text)) {
    return true;
  } else {
    return `Twoje hasło jest nieprawidłowe
    Użyj cyfr i dużych liter`;
  }
};
