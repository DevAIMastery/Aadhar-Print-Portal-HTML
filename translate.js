async function translateToHindi(inputId) {
      try {
        const input = document.getElementById(inputId).value;
        const outputId = inputId + "Hindi"; // map input → output text field

        if (input.trim() === "") {
          document.getElementById(outputId).value = "";
          return;
        }

        const response = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(input)}`
        );
        const data = await response.json();

        const hindiText = data[0].map(item => item[0]).join("");
        document.getElementById(outputId).value = hindiText;
      } catch (error) {
        console.error("Translation error:", error);
        const outputId = inputId + "Output";
        document.getElementById(outputId).value = "Translation failed";
      }
    }
    
    // translate.js

function replaceStateDistrictInHindi(districtEn, stateEn, pincode) {
  const districtMap = {
    "Palamu": "पलामू"
  };

  const stateMap = {
    "Jharkhand": "झारखंड"
  };

  const districtHi = districtMap[districtEn] || districtEn;
  const stateHi = stateMap[stateEn] || stateEn;

  const englishText = `${districtEn}, ${stateEn}, ${pincode}`;
  const hindiText = `${districtHi}, ${stateHi}, ${pincode}`;

  const addressHindi = document.getElementById("addressHindi");

  if (addressHindi) {
    addressHindi.innerHTML = addressHindi.innerHTML.replace(
      new RegExp(englishText, "g"),
      hindiText
    );
  }
}
