// const pack = require("cowsay");
import pack from "cowsay";

function customTongue(tongue) {
  const result = pack.say({
    text: "I'm a moooodule",
    e: "oO",
    T: tongue,
  });

  return result;
}

// module.exports = { customTongue };
// export default { shubh: customTongue };
export { customTongue };
