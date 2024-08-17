export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const gender = ["Male", "Female", "Others"];

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const monthOptions = monthNames.map((month) => ({
  value: month,
  label: month,
}));

export const genderOptions = gender.map((gender) => ({
  value: gender,
  label: gender,
}));

export const bloodGroupOptions = bloodGroups.map((bloodGroup) => ({
  value: bloodGroup,
  label: bloodGroup,
}));

export type TQueryParams = {
  name: string;
  value: boolean | React.Key;
};
