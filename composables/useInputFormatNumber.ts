export const useInputFormatNumber = () => {
  /**
   * Format number string as currency with commas and 2 decimals
   * @param value string or number
   * @returns formatted currency string (e.g. "1,234.56")
   */
  const formatCurrency = (value: string | number): string => {
    if (value == null || value === "") return "";

    // Convert to string and remove unwanted characters (allow only digits & dot)
    let cleanValue = value.toString().replace(/[^\d.]/g, "");

    if (!cleanValue) return "";

    // Split integer and decimal parts
    const [intPart = "", decimalPart] = cleanValue.split(".");

    // Add commas to integer part
    const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Keep at most 2 decimal digits
    return decimalPart
      ? `${withCommas}.${decimalPart.slice(0, 2)}`
      : withCommas;
  };

  return { formatCurrency };
};
