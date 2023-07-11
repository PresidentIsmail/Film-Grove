import React, { useState } from "react";

/**
 * Star rating component.
 * @param {number} maxRating - Maximum rating value (default: 5).
 * @param {string} color - Star color (default: "#FFD700").
 * @param {number} size - Star size (default: 36).
 */
const StarRating = ({
  maxRating = 5,
  onRatingChange,
  color = "#FFD700",
  size = 36,
}) => {
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
    rating: {
      marginLeft: "8px",
      fontSize: `${size / 1.5}px`,
      color: color,
    },
  };

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  /**
   * Event handler for star click.
   * @param {number} index - Index of the clicked star.
   */
  const handleStarClick = (index) => {
    setRating(index + 1);
    if (onRatingChange) onRatingChange(index + 1);
  };

  /**
   * Event handler for star mouse enter.
   * @param {number} index - Index of the hovered star.
   */
  const handleStarMouseEnter = (index) => {
    setHoverRating(index + 1);
  };

  /**
   * Event handler for star mouse leave.
   * @param {number} index - Index of the hovered star.
   */
  const handleStarMouseLeave = (index) => {
    setHoverRating(0);
  };

  const starIcons = Array.from({ length: maxRating }).map((_, index) => (
    <Star
      key={index}
      filled={hoverRating ? index < hoverRating : index < rating}
      onClick={() => handleStarClick(index)}
      onMouseEnter={() => handleStarMouseEnter(index)}
      onMouseLeave={() => handleStarMouseLeave(index)}
      color={color}
      size={size}
    />
  ));

  return (
    <div style={styles.container}>
      {starIcons}
      <span style={styles.rating}>
        {hoverRating ? hoverRating : rating === 0 ? "" : rating}
      </span>
    </div>
  );
};

/**
 * Individual star component.
 * @param {boolean} filled - Determines whether the star is filled or empty.
 * @param {Function} onClick - Click event handler for the star.
 * @param {Function} onMouseEnter - Mouse enter event handler for the star.
 * @param {Function} onMouseLeave - Mouse leave event handler for the star.
 * @param {string} color - Star color.
 * @param {number} size - Star size.
 */
const Star = ({ filled, onClick, onMouseEnter, onMouseLeave, color, size }) => {
  const styles = {
    star: {
      fill: filled ? color : "none",
      stroke: color,
      strokeWidth: "2",
    },
    container: {
      marginRight: "4px",
      cursor: "pointer",
    },
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      // strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      style={styles.container}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      
    >
      <path
        d="M12 2L15.09 8.54L22 9.4L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9.4L8.91 8.54L12 2Z"
        style={styles.star}
        
      />
    </svg>
  );
};

export default StarRating;
