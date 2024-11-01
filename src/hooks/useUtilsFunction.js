import dayjs from "dayjs";
import SettingServices from "@/services/SettingServices";
import { useDispatch, useSelector } from "react-redux";
import { addSetting, removeSetting } from "@/reduxStore/slice/settingSlice";
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "@/context/SidebarContext";

const useUtilsFunction = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { lang } = useContext(SidebarContext);

  const settings = useSelector((state) => state.setting.settingItem);

  const globalSetting = settings.find(
    (value) => value.name === "globalSetting"
  );

  // Original functions remain the same
  const showTimeFormat = (data, timeFormat) => {
    return dayjs(data).format(timeFormat);
  };

  const showDateFormat = (data) => {
    return dayjs(data).format(globalSetting?.default_date_format);
  };

  const showDateTimeFormat = (data) => {
    return dayjs(data).format(`${globalSetting?.default_date_format}  h:mm A`);
  };

  const getNumber = (value = 0) => {
    return Number(parseFloat(value || 0).toFixed(2));
  };

  // Updated getNumberTwo function with thousand separators
  const getNumberTwo = (value = 0) => {
    try {
      // Convert input to number
      const numValue = typeof value === 'string' ? parseFloat(value) : Number(value);
      
      // Get decimal places from global settings or default to 2
      const decimalPlaces = globalSetting?.floating_number || 2;
      
      // Use Intl.NumberFormat for consistent formatting
      return new Intl.NumberFormat('en-NG', {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
        useGrouping: true // Enables thousand separators
      }).format(numValue || 0);
      
    } catch (error) {
      console.error('Error formatting number:', error);
      return "0.00";
    }
  };

  const showingTranslateValue = (data) => {
    return data !== undefined && Object?.keys(data).includes(lang)
      ? data[lang]
      : data?.en;
  };

  const showingImage = (data) => {
    return data !== undefined && data;
  };

  const showingUrl = (data) => {
    return data !== undefined ? data : "!#";
  };

  const currency = globalSetting?.default_currency || "$";

  useEffect(() => {
    const fetchGlobalSetting = async () => {
      try {
        setLoading(true);
        console.log("globalSetting setting not available");
        const res = await SettingServices.getGlobalSetting();
        const globalSettingData = {
          ...res,
          name: "globalSetting",
        };

        dispatch(addSetting(globalSettingData));

        setLoading(false);
      } catch (err) {
        setError(err.message);
        console.log("Error on getting storeCustomizationSetting setting", err);
      }
    };

    if (!globalSetting) {
      fetchGlobalSetting();
    }
  }, [globalSetting]);

  return {
    error,
    loading,
    currency,
    getNumber,
    getNumberTwo,
    showTimeFormat,
    showDateFormat,
    showingImage,
    showingUrl,
    globalSetting,
    showDateTimeFormat,
    showingTranslateValue,
  };
};

export default useUtilsFunction;