const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );

    const buttonElement = formElement.querySelector(
      config.submitButtonSelector
    );

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        const errorElement = formElement.querySelector(
          `.${inputElement.id}-error`
        );

        if (!inputElement.validity.valid) {
          inputElement.classList.add(config.inputErrorClass);
          errorElement.textContent = inputElement.validationMessage;
          errorElement.classList.add(config.errorClass);
        } else {
          inputElement.classList.remove(config.inputErrorClass);
          errorElement.textContent = "";
          errorElement.classList.remove(config.errorClass);
        }

        toggleButtonState(inputList, buttonElement, config);
      });
    });
  });
};

const hasValidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasValidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};
