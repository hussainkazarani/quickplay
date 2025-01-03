export const speedValidation = {
  async validateCustomSpeed(customSpeed) {
    console.log("inside validateSpeed : ");
    const floatSpeed = parseFloat(customSpeed);
    // const { speeds = [] } = await chrome.storage.local.get("speeds");
    const { speeds = [] } = await chrome.storage.local.get("speeds");
    console.log("BEFORE", typeof speeds, speeds);
    const speedArray = [...speeds];
    console.log("AFTER", typeof speedArray, speedArray);

    console.log("TYPE IN VALIDATIONN");
    console.log(speeds);

    console.log(typeof speeds);
    console.log(speeds, "inside validateSpeed"); //Speeds Printed
    const isValid = !isNaN(floatSpeed) && floatSpeed >= 0.5 && floatSpeed <= 5.0 && !speeds.includes(floatSpeed);
    if (speeds.includes(floatSpeed)) {
      return "included-value";
    }
    return isValid;
  },
};
