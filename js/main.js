const d = document;

const $continueBtnRegister = d.getElementById("register-btn"),
  $continueBtnTopics = d.getElementById("topics-btn"),
  $confirmBtnSummary = d.getElementById("btn-confirm"),
  $forms = d.querySelectorAll(".card"),
  $steps = d.querySelectorAll(".step-container"),
  $inputName = d.querySelector('[name="name"]'),
  $inputEmail = d.querySelector('[name="email"]'),
  $name = d.getElementById("summary__name"),
  $email = d.getElementById("summary__email"),
  $options = d.querySelectorAll("input[type='checkbox']"),
  $topics = d.getElementById("topics"),
  $btnConfirm = d.getElementById("btn-confirm"),
  selectedOptions = [];

let inputNameValue = "",
  inputEmailValue = "";

d.addEventListener("DOMContentLoaded", (e) => {
  nextStep();
});

const formValidations = () => {
  const $activeForm = d.querySelector(".card.form-active");
  const $inputs = $activeForm
    ? $activeForm.querySelectorAll("[required]")
    : d.querySelectorAll(".card [required]");

  let isValid = true;

  // Validación de inputs normales (text, email)
  $inputs.forEach((input) => {
    const pattern = input.pattern;
    const value = input.value.trim();

    if (value === "") {
      isValid = false;
    } else if (pattern) {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        isValid = false;
      }
    }
  });

  // Se valida que al menos un checkbox este marcado
  if ($activeForm) {
    const $checkboxes = $activeForm.querySelectorAll("input[type='checkbox']");

    if ($checkboxes.length > 0) {
      const atLeastOneChecked = [...$checkboxes].some((cb) => cb.checked);

      if (!atLeastOneChecked) {
        isValid = false;
      }
    }
  }

  return isValid;
};

const nextStep = () => {
  let i = 0;
  d.addEventListener("click", (e) => {
    if (e.target === $continueBtnRegister || e.target === $continueBtnTopics) {
      if (formValidations()) {
        inputNameValue = $inputName.value.trim();
        inputEmailValue = $inputEmail.value.trim();

        $name.innerHTML = `<p id="summary__name"><span class="name">Name: </span>${inputNameValue}</p>`;
        $email.innerHTML = `<p id="summary__email"><span class="email">Email: </span>${inputEmailValue}</p>`;

        $options.forEach((checkbox) => {
          // Se detecta que opción ha sido seleccionada
          if (checkbox.checked) selectedOptions.push(checkbox.value);
        });

        // Se recorre el arreglo que contiene las opciones seleccionadas
        selectedOptions.forEach((el) => {
          const $li = document.createElement("li");
          $li.textContent = el;
          $topics.appendChild($li);
        });

        $forms[i].classList.remove("form-active");
        $steps[i].classList.remove("available");
        $steps[i]
          .closest("div")
          .children[1].children[0].children[i].classList.remove("active");

        i++;

        $forms[i].classList.add("form-active");
        $steps[i].classList.add("available");
        $steps[i]
          .closest("div")
          .children[1].children[0].children[i].classList.add("active");
      }
    }
  });
};

$btnConfirm.addEventListener("click", (e) => alert("🎉 Success"));
