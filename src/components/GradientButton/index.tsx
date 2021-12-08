import styles from "./GradientButton.module.scss";

interface GradientButtonProps {
  onClick?: () => void;
  text: string;
}

const GradientButton = ({ onClick, text }: GradientButtonProps) => (
  <button className={styles["gradient-button"]} onClick={onClick}>
    {text}
  </button>
);

export default GradientButton;
