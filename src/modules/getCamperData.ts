import Camper from "../database/models/CamperModel";
import { CamperInt } from "../interfaces/CamperInt";

export const getCamperData = async (
  id: string
): Promise<CamperInt | undefined> => {
  try {
    const targetCamperData = await Camper.findOne({ discordId: id });

    if (targetCamperData) {
      return targetCamperData;
    }

    const newCamperData = await Camper.create({
      discordId: id,
      round: 1,
      day: 0,
      date: Date.now(),
    });

    return newCamperData;
  } catch (error) {
    console.log("getCamperData module", error);
    return;
  }
};
