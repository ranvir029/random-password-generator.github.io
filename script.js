const slider = document.querySelector(".password_range input");
const slider_value = document.getElementById("password_length_counter");
const generatebtn = document.querySelector(".btn_container input");
const options_checked = document.querySelectorAll(".options input");
const passwordSpace = document.getElementById("Password_generator_space");
const animation_bar = document.querySelector(".animation_bar");
const copyIcon = document.getElementById("icon");
const pasteIcon = document.getElementById("paste_icon");
const password_strength_value = document.getElementById("password_strength_level");
const characters = {
     Lowercase: "abcdefghijklmnopqrstuvwxyz",
     Uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
     Numbers: "0123456789",
     Symbols: "!@#$%^&*()<>",
}


function generatePassword() {
     let staticPassword = ""
     PassLenght = slider.value;
     randomPassword = " ";
     duplicate_values = false;

     options_checked.forEach(options => {
          if (options.checked) {

               if (options.id !== "Include_spaces" && options.id !== "Exclude") {
                    staticPassword += characters[options.id]
               }
               else if (options.id == "Include_spaces") {
                    staticPassword += `  ${staticPassword}  `;

               }
               else {
                    duplicate_values = true;
               }
          }

     });
     for (let i = 0; i < PassLenght; i++) {
          let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
          //  handeling duplicate values  
          if (duplicate_values) {
               !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
          }
          else {
               randomPassword += randomChar;
          }
     }
     if (passwordSpace.value = " ") {
          passwordSpace.value += randomPassword;
     }
     else if (passwordSpace.value += randomPassword) {
          passwordSpace.value = " ";
     }

}

function updateSlider() {
     slider_value.textContent = slider.value;
     generatePassword();
     animation_bar.id = slider.value;
     if (animation_bar.id < 8) {
          animation_bar.id = "weak";
          password_strength_value.textContent = "Weak";
     }
     else if (animation_bar.id < 8 || animation_bar.id <= 16) {
          animation_bar.id = "medium";
          password_strength_value.textContent = "Intermediate";
     }
     else if (animation_bar.id < 16 || animation_bar.id <= 25) {
          animation_bar.id = "medium-strong";
          password_strength_value.textContent = "Strong"
     }
     else {
          animation_bar.id = "strong";
          password_strength_value.textContent = "Very Strong"
     }

}

updateSlider();
slider.addEventListener("input", updateSlider);
generatebtn.addEventListener("click", generatePassword)

function copyPassword() {
     navigator.clipboard.writeText(passwordSpace.value);
     copyIcon.innerText = "✅";
     setTimeout(() => {
          copyIcon.innerText = "📋";
     }, 2500);
}
copyIcon.addEventListener("click", copyPassword);