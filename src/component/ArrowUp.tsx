import { useEffect, useState } from "react";
import { IoIosArrowDropup } from "react-icons/io";

const ArrowUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // set arrow to be visible when scrolled 20% down
      const scrolledPercentage =
        (document.documentElement.scrollTop /
          document.documentElement.offsetHeight) *
        100;

      if (scrolledPercentage > 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); //cleanup function
  }, []);
  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  return (
    <div className="rounded-full opacity-80 text-primary-black fixed bottom-4 right-4 align-middle cursor-pointer z-[99]">
      {isVisible && (
        <IoIosArrowDropup
          className="w-[40px] h-[40px]"
          onClick={() => scrollToTop()}
        />
      )}
    </div>
  );
};

export default ArrowUp;
