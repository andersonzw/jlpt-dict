import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const BookmarkPopup = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: "100vw" }} // start
          animate={{ x: 0 }} // end
          exit={{ opacity: 0 }} // exit
          transition={{ type: "spring", stiffness: 120, damping: 17 }}
          style={{
            padding: "0.8rem 1rem",
            backgroundColor: "rgb(215 236 255)",
            position: "fixed",
            bottom: "5px",
            right: "10px",
            zIndex: "120",
            verticalAlign:"middle",
            textAlign:"center",
            borderRadius:"10px",
            fontSize: "0.8rem",
            boxShadow:"0px 4px 4px 1px #a4a5be"
          }}
        >
          Added To Bookmarks!
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookmarkPopup;
