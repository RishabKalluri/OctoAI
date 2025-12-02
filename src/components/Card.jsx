import { motion } from 'framer-motion'

export default function Card({ 
  children, 
  className = '', 
  hover = false,
  delay = 0,
  ...props 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={`bg-white rounded-xl border border-octo-gray-150 shadow-soft ${
        hover ? 'transition-all duration-200 hover:shadow-soft-lg hover:border-octo-gray-200 cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}


