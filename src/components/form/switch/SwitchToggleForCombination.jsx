import React from "react";
import Switch from "react-switch";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const SwitchToggleForCombination = ({ title, product, handleProcess, processOption }) => {
  const { t } = useTranslation();

  const handleSwitchClick = (event) => {
    event.stopPropagation(); // Prevent parent elements from receiving the click event
  };

  return (
    <div
      className={`${
        product ? "mb-3 flex flex-wrap justify-end items-center mr-8" : "mb-3"
      }`}
      style={{
        height: product ? 20 : 0,
        transition: "all 0.3s",
        visibility: product ? "visible" : "hidden",
        opacity: product ? "1" : "0",
      }}
      onClick={(e) => e.stopPropagation()} // Prevent any accidental toggle from parent clicks
    >
      <div className="flex flex-wrap items-center">
        <label
          className={`block ${
            product
              ? "mx-4 text-base font-normal text-orange-500 dark:text-orange-400"
              : "mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300"
          }`}
        >
          {product ? t("ThisProductHaveVariants") : title}
        </label>

        <Switch
          onChange={handleProcess}
          checked={processOption}
          className="react-switch md:ml-0 ml-3"
          width={80}
          height={30}
          handleDiameter={28}
          offColor="#E53E3E"
          onColor="#2F855A"
          onClick={handleSwitchClick} // Prevent unintentional switch toggle
          uncheckedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 14,
                color: "white",
                paddingRight: 5,
                paddingTop: 1,
              }}
            >
              No
            </div>
          }
          checkedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 14,
                color: "white",
                paddingLeft: 8,
                paddingTop: 1,
              }}
            >
              Yes
            </div>
          }
        />
      </div>
    </div>
  );
};

// Default prop value for title
SwitchToggleForCombination.defaultProps = {
  title: "Default Title",
};

// Prop Types validation
SwitchToggleForCombination.propTypes = {
  title: PropTypes.string.isRequired,
  product: PropTypes.bool.isRequired,
  handleProcess: PropTypes.func.isRequired,  // Ensure it's a function
  processOption: PropTypes.bool.isRequired,
};

export default SwitchToggleForCombination;
