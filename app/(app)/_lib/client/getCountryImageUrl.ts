export const getCountryImageUrl = (country: string) =>
  `/flags/${country.replace(" ", "-")}.webp`;
