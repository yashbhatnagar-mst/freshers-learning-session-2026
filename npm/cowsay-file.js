const pack = require("cowsay");

function customTongue(tongue) {
  const result = pack.say({
    text: "I'm a moooodule",
    e: "oO",
    T: tongue,
  });

  return result;
}

module.exports = { lavi: customTongue };
