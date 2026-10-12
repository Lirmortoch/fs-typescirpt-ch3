import type { NonSensitivePatientsEntry } from "../types.ts";
import patients from "../../data/patients.ts";

const getNonSensitivePatientsData = (): NonSensitivePatientsEntry[] =>{
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    }
  });
}

export default {
  getNonSensitivePatientsData,
}