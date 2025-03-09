import countries from "i18n-iso-countries";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/vi.json"));

const countryNameMap = {
  laos: "LA",
  lào: "LA",
};

function getCountryCode(location) {
  if (!location) return null;

  const countryName = location.split(", ").pop();
  const normalizedCountryName = countryName.toLowerCase().trim();

  const countryCode =
    countryNameMap[normalizedCountryName] ||
    countries.getAlpha2Code(normalizedCountryName, "en");

  if (!countryCode) {
    console.warn(`⚠️ Không tìm thấy mã quốc gia cho: "${countryName}"`);
    return "UNKNOWN"; // Hoặc return null nếu muốn
  }

  return countryCode;
}

export default getCountryCode;
