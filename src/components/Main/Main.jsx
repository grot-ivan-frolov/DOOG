import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './main.css'

export function Main() {
  return (
    <div className="picture">
      <div className="opacity">
        <motion.h1
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
          }}
          className="mb-5"
        >
          Лакомства для счастливых собак
        </motion.h1>
        <Link to="/products">
          <motion.button
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              opacity: {
                duration: 1,
              },
              y: {
                duration: 1,
              },
            }}
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.9,
            }}
            type="button"
            className="btn btn-primary mt-4"
          >
            перейти к покупкам
          </motion.button>

        </Link>
      </div>
    </div>
  )
}
