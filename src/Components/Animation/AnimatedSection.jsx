import { motion } from "framer-motion";

export default function AnimatedSection({ children, variants }) {
  return (
    <>
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.3,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
