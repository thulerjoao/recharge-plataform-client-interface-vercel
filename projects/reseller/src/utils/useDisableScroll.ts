import { useEffect } from "react";

interface UseDisableScrollProps {
  isOpen: boolean;
}

const useDisableScroll = ({ isOpen }: UseDisableScrollProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  // useEffect(() => {
  //   if (isOpen) {
  //     document.documentElement.style.overflowY = "hidden";
  //     document.body.style.overflowY = "scroll";
  //   } else {
  //     document.documentElement.style.overflowY = "scroll";
  //   }
  //   return () => {
  //     document.documentElement.style.overflowY = "scroll";
  //     document.body.style.overflowY = "hidden";
  //   };
  // }, [isOpen]);
};

export default useDisableScroll;
