const PROFESSIONAL_START = Date.UTC(2024, 7, 1); // First full-time role: August 2024.
export const getExperienceYears = () => {
  const today = new Date();
  const elapsedDays = (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - PROFESSIONAL_START) / 86_400_000;
  return (Math.max(0, elapsedDays) / 365.2425).toFixed(1);
};

