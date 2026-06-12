import pack from "cowsay";

function customTongue(tongue) {
  const result = pack.say({
    text: "I'm a moooodule",
    e: "oO",
    T: tongue,
  });

  return result;
}

console.log(customTongue("U "));
