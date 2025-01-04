export const speedValidator = {
  //validation for .custom-speed value
  validateCustomSpeed(customSpeedInString, speeds) {
    const floatSpeed = parseFloat(customSpeedInString);
    if (speeds.includes(floatSpeed)) {
      return "included-value";
    }
    const isValid = !isNaN(floatSpeed) && floatSpeed >= 0.5 && floatSpeed <= 5.0;
    return isValid ? true : false;
  },

  //validation for .default-speed value
  validateDefaultSpeed(defaultSpeedInString, defaultPlayback, speeds) {
    const floatSpeed = parseFloat(defaultSpeedInString);
    const isValid = !isNaN(floatSpeed) && floatSpeed >= 0.5 && floatSpeed <= 5.0;
    if (isValid) {
      if (floatSpeed === defaultPlayback) {
        return "included-value";
      } else if (speeds.includes(floatSpeed)) {
        return "exists-in-array";
      } else {
        return "not-exists-in-array";
      }
    } else {
      return false;
    }
  },

  //truncating the input elements to 00.00
  fixedInputListeners() {
    //customSpeed
    const customSpeedElement = document.querySelector(".custom-speed");
    customSpeedElement.addEventListener("input", (event) => {
      const value = event.target.value;
      if (!/^\d{0,2}(\.\d{0,2})?$/.test(value)) {
        event.target.value = value.slice(0, -1);
      }
    });

    //defaultSpeed
    const defaultSpeedElement = document.querySelector(".default-speed");
    defaultSpeedElement.addEventListener("input", (event) => {
      const value = event.target.value;
      if (!/^\d{0,2}(\.\d{0,2})?$/.test(value)) {
        event.target.value = value.slice(0, -1);
      }
    });
  },
};
