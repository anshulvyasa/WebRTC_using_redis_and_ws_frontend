import { AnimatePresence, motion } from "motion/react";

interface ErrorMessage {
  message: string | null;
}

const DisplayErrorMessage: React.FC<ErrorMessage> = ({ message }) => {
  return (
    <AnimatePresence>
      <motion.div
        key="roomError"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        className="alert alert-error"
      >
        {message}
      </motion.div>
    </AnimatePresence>
  );
};

export default DisplayErrorMessage;
