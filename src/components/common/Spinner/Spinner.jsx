import "./Spinner.css";

const Spinner = ({ size = 18, thickness = 2 }) => {
  return (
    <span
      className="spinner"
      style={{
        width: size,
        height: size,
        borderWidth: thickness,
      }}
    />
  );
};

export default Spinner;
