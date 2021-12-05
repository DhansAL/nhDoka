import { CamperInt } from "../interfaces/CamperInt";

export const updateCamperData = async (
  Camper: CamperInt
): Promise<CamperInt | undefined> => {
  try {
    Camper.day++;
    if (Camper.day > 100) {
      Camper.day = 1;
      Camper.round++;
    }
    Camper.timestamp = Date.now();
    await Camper.save();
    return Camper;
  } catch (err) {
    console.log("updateCamperData module", err);
    return;
  }
};
