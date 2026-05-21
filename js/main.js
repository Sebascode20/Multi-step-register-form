const d = document;

const $continueBtnRegister = d.getElementById("register-btn"),
  $continueBtnTopics = d.getElementById("topics-btn"),
  $confirmBtnSummary = d.getElementById("btn-confirm"),
  $forms = d.querySelectorAll(".card");

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

  // Validación de checkboxes: al menos uno marcado
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
        $forms[i].classList.remove("form-active");
        i++;

        if (i >= $forms.length) {
          i = 0;
        }

        $forms[i].classList.add("form-active");
      }
    }
  });
};
