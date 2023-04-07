/* eslint-disable max-len */
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const svgVariants = {
  hidden: {},
  visible: {
    // transition: { duration: 1 },
  },
}

const pathVariants = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 4,
      ease: 'easeInOut',
    },
  },
}

export function PageNotFound() {
  return (
    <div className="d-flex flex-column align-items-center gap-5 mt-5">
      <motion.svg
        variants={svgVariants}
        initial="hidden"
        animate="visible"
        width="640"
        height="264.029"
        viewBox="0 0 640 264.029"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          id="svgGroup"
          strokeLinecap="round"
          fillRule="evenodd"
          fontSize="9pt"
          stroke="#000"
          strokeWidth="0.25mm"
          fill="none"
          style={{
            stroke: '#000',
            strokeWidth: '0.25mm',
            fill: 'none',
          }}
        >
          <motion.path
            variants={pathVariants}
            d="M 0 194.812 L 3.2 160.412 L 98.4 10.412 L 164.4 2.412 L 158.8 157.212 L 197.2 155.612 L 193.2 196.012 L 161.2 195.212 L 163.6 259.612 L 107.6 259.612 L 111.6 194.412 L 0 194.812 Z M 442.8 194.812 L 446 160.412 L 541.2 10.412 L 607.2 2.412 L 601.6 157.212 L 640 155.612 L 636 196.012 L 604 195.212 L 606.4 259.612 L 550.4 259.612 L 554.4 194.412 L 442.8 194.812 Z M 373.734 7.116 A 83.797 83.797 0 0 0 338.8 0.012 A 98.317 98.317 0 0 0 287.399 13.582 A 109.703 109.703 0 0 0 257.4 40.612 A 144.821 144.821 0 0 0 230.404 98.848 A 208.234 208.234 0 0 0 225.6 144.812 A 215.836 215.836 0 0 0 225.681 150.748 Q 226.227 170.589 230.462 187.496 A 117.005 117.005 0 0 0 251 231.012 A 101.11 101.11 0 0 0 257.159 238.293 A 78.204 78.204 0 0 0 316.8 264.012 A 133.599 133.599 0 0 0 328.865 263.479 A 97.234 97.234 0 0 0 399.8 225.212 Q 430 186.412 430 118.812 Q 430 94.315 424.778 74.205 A 114.944 114.944 0 0 0 405 32.612 A 102.009 102.009 0 0 0 403.952 31.268 Q 390.969 14.913 373.734 7.116 Z M 329.6 224.812 A 51.847 51.847 0 0 0 343.443 223.085 A 34.067 34.067 0 0 0 365.4 205.212 Q 373.168 190.285 375.02 157.725 A 391.049 391.049 0 0 0 375.6 135.612 Q 375.6 97.148 369.445 76.319 A 62.717 62.717 0 0 0 365.2 65.412 A 35.055 35.055 0 0 0 340.131 46.322 A 54.648 54.648 0 0 0 328.8 45.212 A 55.543 55.543 0 0 0 314.06 47.044 A 36.902 36.902 0 0 0 291.4 64.212 A 58.504 58.504 0 0 0 285.762 77.536 Q 281.576 91.531 280.431 112.997 A 324.106 324.106 0 0 0 280 130.212 A 297.091 297.091 0 0 0 280.949 154.814 Q 283.014 179.571 289.567 195.648 A 73.739 73.739 0 0 0 292 201.012 Q 304 224.812 329.6 224.812 Z M 112.4 156.412 L 110.4 54.012 L 46.8 156.812 L 112.4 156.412 Z M 555.2 156.412 L 553.2 54.012 L 489.6 156.812 L 555.2 156.412 Z"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </motion.svg>
      <Link
        to="/"
        className="btn mt-5 btn-primary"
      >
        На главную
      </Link>
    </div>
  )
}