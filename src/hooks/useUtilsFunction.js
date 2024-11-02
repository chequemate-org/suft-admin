import dayjs from "dayjs";
import SettingServices from "@/services/SettingServices";
import { useDispatch, useSelector } from "react-redux";
import { addSetting } from "@/reduxStore/slice/settingSlice";
import { useContext, useEffect, useState, useMemo } from "react";
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

  const getNumberTwo = (value = 0) => {
    try {
      const numValue =
        typeof value === "string" ? parseFloat(value) : Number(value);

      const decimalPlaces = globalSetting?.floating_number || 2;

      return new Intl.NumberFormat("en-NG", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
        useGrouping: true,
      }).format(numValue || 0);
    } catch (error) {
      console.error("Error formatting number:", error);
      return "0.00";
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return "NGN 0.00";

    const numericValue = parseFloat(amount.replace(/[^\d.-]/g, ""));
    if (isNaN(numericValue)) return "NGN 0.00";

    const formattedAmount = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericValue);

    return `NGN ${formattedAmount}`;
  };

  const showingTranslateValue = (data) => {
    return data?.[lang] || data?.en || "";
  };

  const showingImage = (data) => data || "";

  const showingUrl = (data) => data || "!#";

  const currency = useMemo(
    () => globalSetting?.default_currency || "NGN",
    [globalSetting]
  );

  useEffect(() => {
    const fetchGlobalSetting = async () => {
      try {
        setLoading(true);
        console.log("Fetching global setting");
        const res = await SettingServices.getGlobalSetting();
        const globalSettingData = {
          ...res,
          name: "globalSetting",
        };

        dispatch(addSetting(globalSettingData));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        console.log("Error fetching global settings", err);
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
    formatCurrency,
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
