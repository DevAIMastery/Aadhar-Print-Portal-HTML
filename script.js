// Aadhaar form submit handler
document.getElementById("aadharForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(this).entries());

  // Handle photo upload
  const photoFile = this.photo.files[0];
  if (photoFile) {
    const reader = new FileReader();
    reader.onload = () => {
      document.getElementById("userPhoto").src = reader.result;
    };
    reader.readAsDataURL(photoFile);
  }

  // Aadhaar number split
  const aadhaar = data.aadhaarNo || "";
  const split = aadhaar.match(/.{1,4}/g) || ["", "", "", ""];

  // Personal details
  document.getElementById("details").innerHTML = `
    ${data.nameHindi || ""}<br>
    ${data.nameEnglish || ""}<br>
    जन्म तिथि/DOB: ${data.dob || ""}<br>
    ${data.gender || ""}
  `;

  // Aadhaar number left/right
  document.getElementById("aadhaarNoLeft").textContent = split.join(" ");
  document.getElementById("aadhaarNoRight").textContent = split.join(" ");

  // Hindi address
  document.getElementById("addressHindi").innerHTML = `
    पता:<br>
    ${data.relationType}: ${data.spouseHindi},<br>
    ग्राम -${data.villageHindi}, पोस्ट-${data.postHindi},<br>
    थाना–${data.psHindi}, ${data.villageHindi},<br>
    ${data.district}, ${data.state}, ${data.pincode}
  `;

  // English address
  document.getElementById("addressEnglish").innerHTML = `
    Address:<br>
    ${data.relationType} ${data.spouseEnglish},<br>
    VILL-${data.villageEnglish}, PO-${data.postEnglish},<br>
    PS: ${data.psEnglish}, ${data.villageEnglish},<br>
    ${data.district}, ${data.state}, ${data.pincode}
  `;

  // ✅ QR Code from API (crossorigin enabled in HTML)
  const qrText = `<?xml version="1.0" encoding="UTF-8"?>
  <PrintLetterBarcodeData uid="${aadhaar}"
  name="${data.nameEnglish}" gender="${data.gender}" dob="${data.dob}" ${data.relationType}="${data.spouseEnglish}"
  loc="${data.villageEnglish}" po="${data.postEnglish}"
  vtc="${data.villageEnglish}" ps="${data.psEnglish}"
  dist="${data.district}" state="${data.state}" pc="${data.pincode}" />`;

  document.getElementById("qrCode").src =
    `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(qrText)}`;

  // Show print view
  document.getElementById("aadharForm").style.display = "none";
  document.getElementById("printSection").style.display = "block";
});

// Back button
document.getElementById("backBtn").addEventListener("click", () => {
  document.getElementById("printSection").style.display = "none";
  document.getElementById("aadharForm").style.display = "block";
});

// ✅ Download Aadhaar card only (no buttons, full size)
document.getElementById("downloadBtn").addEventListener("click", () => {
  const aadhaarCard = document.getElementById("aadhaarCard");

  html2canvas(aadhaarCard, {
    scale: 2,
    useCORS: true
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = "aadhaar-card.jpg";
    link.href = canvas.toDataURL("image/jpeg", 1.0);
    link.click();
  });
});

// script.js (after setting address content)

const district = document.querySelector('input[name="district"]').value;
const state = document.querySelector('input[name="state"]').value;
const pincode = document.querySelector('input[name="pincode"]').value;

replaceStateDistrictInHindi(district, state, pincode);
