import { jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import classNames from "classnames";
dayjs.extend(utc);
const Countdown = ({
  targetDate,
  onExpiry,
  className = "",
  displayType = "long",
  closeToExpiryClassName = ""
}) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [closeToExpiry, setCloseToExpiry] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      const dateInUTC = dayjs.utc(targetDate);
      const diff = dateInUTC.diff(now);
      if (diff <= 0) {
        setTimeLeft(displayType === "short" ? "0:00" : i18n._(
          /*i18n*/
          {
            id: "rmelwV"
          }
        ));
        clearInterval(interval);
        onExpiry && onExpiry();
        return;
      }
      const days = Math.floor(diff / (1e3 * 60 * 60 * 24));
      const hours = Math.floor(diff / (1e3 * 60 * 60) % 24);
      const minutes = Math.floor(diff / 1e3 / 60 % 60);
      const seconds = Math.floor(diff / 1e3 % 60);
      if (!closeToExpiry) {
        setCloseToExpiry(days === 0 && hours === 0 && minutes < 5);
      }
      if (displayType === "short") {
        const totalHours = days * 24 + hours;
        const formattedMinutes = String(minutes).padStart(2, "0");
        let display;
        if (totalHours > 0) {
          display = `${totalHours}:${formattedMinutes}:${String(seconds).padStart(2, "0")}`;
        } else if (minutes > 0) {
          display = seconds > 0 ? `${minutes}:${String(seconds).padStart(2, "0")}` : `${minutes}:00`;
        } else {
          display = String(seconds);
        }
        setTimeLeft(display);
      } else {
        if (days > 0) {
          setTimeLeft(i18n._(
            /*i18n*/
            {
              id: "Vjij1k",
              values: {
                days,
                hours,
                minutes,
                seconds
              }
            }
          ));
        } else if (hours > 0) {
          setTimeLeft(i18n._(
            /*i18n*/
            {
              id: "f3RdEk",
              values: {
                hours,
                minutes,
                seconds
              }
            }
          ));
        } else {
          setTimeLeft(i18n._(
            /*i18n*/
            {
              id: "fyE7Au",
              values: {
                minutes,
                seconds
              }
            }
          ));
        }
      }
    }, 1e3);
    return () => {
      clearInterval(interval);
    };
  }, [targetDate, onExpiry, displayType]);
  return /* @__PURE__ */ jsx("span", { className: classNames(className, closeToExpiry ? closeToExpiryClassName : ""), children: timeLeft === "" ? "--:--" : timeLeft });
};
export {
  Countdown as C
};
