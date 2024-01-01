import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { faker } from "https://cdn.skypack.dev/@faker-js/faker";
import Card from "./Card";
import Chip from "./Chip";

export default function DialogBox({ visible, setVisible }) {
  const [themeCard, setThemeCard] = useState(null);
  const [themeDisplayCard, setThemeDisplayCard] = useState({
    theme: themeCard?.code,
    title: "lorem",
    description: "Have a good day!",
    chips: ["new", "day"],
  });
  const initialValues = {
    inputChips: "",
    chips: [],
    inputTitle: "",
    inputDescription: "",
    theme: "",
  };
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({
    titleError: "",
    descriptionError: "",
    themeError: "",
  });
  const themes = [
    { name: "Light Theme", code: "theme-light" },
    { name: "Blue Theme", code: "theme-blue" },
    { name: "Orange Theme", code: "theme-orange" },
    { name: "Purple Theme", code: "theme-purple" },
    { name: "Green Theme", code: "theme-green" },
    { name: "Red Theme", code: "theme-red" },
    { name: "Dark Theme", code: "theme-dark" },
  ];

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && values.inputChips.trim() !== "") {
      setValues((prev) => ({
        ...prev,
        chips: [...values.chips, values.inputChips.trim()],
        inputChips: "",
      }));
    }
  };
  const handleDelete = (chipIndex) => {
    const updatedChips = values.chips.filter((_, index) => index !== chipIndex);
    setValues((prev) => ({ ...prev, chips: updatedChips }));
  };
  const handleSaveTheme = () => {
    setValues((prev) => ({ ...prev, theme: themeDisplayCard.theme }));

    if (!themeDisplayCard.theme) {
      setErrors((prev) => ({ ...prev, themeError: "Select any one theme" }));
    }
  };
  const handleCreateCard = () => {
    let proceed = true;
    const cardsArray = JSON.parse(localStorage.getItem("cards")) || [];

    const object = {
      id: faker.string.uuid(),
      theme: values.theme,
      title: faker.string.alpha(+values.inputTitle),
      description: faker.lorem.words(+values.inputDescription),
      chips: values.chips,
    };
    cardsArray.push(object);
    localStorage.setItem("cards", JSON.stringify(cardsArray));
  };
  useEffect(() => {
    setThemeDisplayCard((prev) => ({ ...prev, theme: themeCard?.code }));
    if (themeDisplayCard !== "") {
      setErrors((prev) => ({ ...prev, themeError: "" }));
    }
  }, [themeCard]);
  useEffect(() => {
    setValues(initialValues);
    setThemeCard(null);
  }, [visible]);

  return (
    <div>
      <Dialog
        visible={visible}
        style={{
          width: "50vw",
          zIndex: "20",
          background: "#fff",
          position: "relative",
        }}
        className="px-5 pb-4 dialogBox"
        onHide={() => setVisible(false)}
      >
        <h2 className="mb-3 text-5xl">Create a card</h2>
        <h3 className="mb-4">
          Select a theme for your Card <span className="errormsg">*</span>
        </h3>
        <div className="flex gap-3 mb-4">
          <Card item={themeDisplayCard} />
          <div className="m-3 flex flex-column gap-3">
            <Dropdown
              value={themeCard}
              onChange={(e) => {
                setThemeCard(e.value);
              }}
              options={themes}
              optionLabel="name"
              placeholder="Select your theme"
              className="w-full md:w-14rem custom-dropdown"
            />
            <button className="save-button" onClick={() => handleSaveTheme()}>
              Save Theme
            </button>
            <span className="errormsg">{errors.themeError}</span>
          </div>
        </div>

        <div className="flex w-full mb-3 justify-content-between align-items-center">
          <p className="font-bold">Enter Chips (if any)</p>
          <div>
            <input
              type="text"
              value={values.inputChips}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, inputChips: e.target.value }))
              }
              onKeyDown={(e) => handleKeyDown(e)}
              className="custom-input"
              placeholder="Enter Chips"
            />
            {values.chips.length !== 0 ? (
              <div className="flex gap-2 flex-wrap">
                {values.chips.map((item, index) => {
                  return (
                    <Chip
                      key={index}
                      label={item}
                      onDelete={() => handleDelete(index)}
                    />
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex w-full justify-content-between align-items-center">
          <p className="font-bold">
            Enter your title word limit<span className="errormsg ml-1">*</span>
          </p>
          <div className="flex flex-column">
            <input
              value={values.inputTitle}
              onChange={(e) => {
                setValues((prev) => ({ ...prev, inputTitle: e.target.value }));
                if (e.target.value.trim() === "") {
                  setErrors((prev) => ({
                    ...prev,
                    titleError: "Input Title Word Limit",
                  }));
                } else {
                  setErrors((prev) => ({ ...prev, titleError: "" }));
                }
              }}
              type="number"
              min="1"
              max="20"
              className="custom-input"
              placeholder="Title word limit"
            />
            <span style={{ float: "right" }} className="errormsg">
              {errors.titleError}
            </span>
          </div>
        </div>
        <div className="flex w-full justify-content-between align-items-center">
          <p className="font-bold">
            Input your description word limit
            <span className="errormsg ml-1">*</span>
          </p>
          <div className="flex flex-column">
            <input
              value={values.inputDescription}
              onChange={(e) => {
                setValues((prev) => ({
                  ...prev,
                  inputDescription: e.target.value,
                }));
                if (e.target.value.trim() === "") {
                  setErrors((prev) => ({
                    ...prev,
                    descriptionError: "Input Description Word Limit",
                  }));
                } else {
                  setErrors((prev) => ({ ...prev, descriptionError: "" }));
                }
              }}
              type="number"
              className="custom-input"
              placeholder="Description word limit"
            />
            <span className="errormsg">{errors.descriptionError}</span>
          </div>
        </div>
        <div className="w-full relative mt-4">
          <div
            className="flex gap-2"
            style={{ marginBottom: "22px", position: "absolute", right: "2%" }}
          >
            <button
              style={{ color: "#333" }}
              onClick={() => handleCreateCard()}
            >
              Create Card
            </button>
            <button
              style={{ color: "#333" }}
              onClick={() => {
                setVisible(false);
                setValues(initialValues);
                setThemeCard(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
