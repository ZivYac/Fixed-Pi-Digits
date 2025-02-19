import { Button } from "theme-ui";
const MyButton = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      sx={{
        borderRadius: "30px",
        color: "black",
        textAlign: "center",
        px: "20px",
        fontWeight: "bold",
        fontSize: "18px",
        ":hover": {
          opacity: "0.8",
          outline: "2px solid black",
        },
        ":disabled": {
          bg: "lightgray",
        },
        transition: "100ms ease-in",
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
};
export default MyButton;
