var storedCombinedUnitValues="";

const scribbleCanvas = document.getElementById('scribbleCanvas');
const context = scribbleCanvas.getContext('2d');
const generateButton = document.getElementById('generateButton');
const combinedValueContainer = document.getElementById('combinedValue');

let isDrawing = false;
let scribbleCoordinates = [];

scribbleCanvas.addEventListener('mousedown', startDrawing);
scribbleCanvas.addEventListener('mousemove', draw);
scribbleCanvas.addEventListener('mouseup', stopDrawing);
scribbleCanvas.addEventListener('mouseleave', stopDrawing);
generateButton.addEventListener('click', generateCombinedValue);

function startDrawing(event) {
  isDrawing = true;
  scribbleCoordinates = [];
  context.beginPath();
  context.moveTo(event.clientX - scribbleCanvas.offsetLeft, event.clientY - scribbleCanvas.offsetTop);
}

function draw(event) {
  if (!isDrawing) return;
  context.lineTo(event.clientX - scribbleCanvas.offsetLeft, event.clientY - scribbleCanvas.offsetTop);
  context.stroke();
  scribbleCoordinates.push({
    x: event.clientX - scribbleCanvas.offsetLeft,
    y: event.clientY - scribbleCanvas.offsetTop
  });
}

function stopDrawing() {
  isDrawing = false;
}

function generateCombinedValue() {
  var combinedUnitValues = scribbleCoordinates.map(coord => {
    var xUnitDigit = coord.x % 10;
    var yUnitDigit = coord.y % 10;
    return `${xUnitDigit}${yUnitDigit}`;
  }).join('');
  combinedUnitValues=combinedUnitValues.substring(1,27);
    storedCombinedUnitValues = combinedUnitValues;
  // combinedValueContainer.textContent = `Combined Unit Values: ${combinedUnitValues}`;
}

const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

const generatePassword = (length, includeUppercase, includeNumbers, includeSymbols) => {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += uppercaseLetters;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;
    console.log("ee"+charset.length);

    let password = "";
    // for (let i = 0; i < length; i++) {
    //     const randomIndex = Math.floor(Math.random() * charset.length);
    //     console.log("randomIndex");
    //     password += charset.charAt(randomIndex);
    // }
        var i=0,jj=1;
        for (let j = 0; j < length; j++)
          {
            if(charset.length<27){
              var randomIndex= storedCombinedUnitValues.charAt(i);
              password += charset.charAt(randomIndex);
            }
            else
            {
              var randomIndex= storedCombinedUnitValues.charAt(i)+storedCombinedUnitValues.charAt(jj)+"";
              password += charset.charAt(randomIndex);
            }
             
              console.log(randomIndex+"ooo:"+password);
              i=i+2;
              jj=jj+2;
          }
        

    return password;
};

document.getElementById("generateBtn").addEventListener("click", () => {
    const passwordLength = parseInt(document.getElementById("passwordLength").value, 10);
    if (isNaN(passwordLength)) {
        alert("Please enter a valid password length.");
        return;
    }

    const includeUppercase = document.getElementById("includeUppercase").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSymbols = document.getElementById("includeSymbols").checked;

    const password = generatePassword(passwordLength, includeUppercase, includeNumbers, includeSymbols);
    document.getElementById("passwordDisplay").textContent = password;

    // Password strength rating (you can customize this logic based on your requirements)
    let strength = "Weak";
    if (password.length >= 10 && includeUppercase && includeNumbers && includeSymbols) {
        strength = "Strong";
    } else if (password.length >= 8 && (includeUppercase || includeNumbers || includeSymbols)) {
        strength = "Moderate";
    }
    document.getElementById("passwordStrength").textContent = `Password Strength: ${strength}`;
});

document.getElementById("copyBtn").addEventListener("click", () => {
    const passwordDisplay = document.getElementById("passwordDisplay");
    const textarea = document.createElement("textarea");
    textarea.value = passwordDisplay.textContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Password copied to clipboard!");
});


