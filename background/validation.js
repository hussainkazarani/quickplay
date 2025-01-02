import { StorageManager } from "./storage.js";

export const SpeedValidator = {
  validateSpeed(speedFromUser) {
    const floatSpeed = parseFloat(speedFromUser);
    const isValid = !isNaN(floatSpeed) && floatSpeed >= 0.5 && floatSpeed <= 5.0;
    
    return isValid;
  },
};
