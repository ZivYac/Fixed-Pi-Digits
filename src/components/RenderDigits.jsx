import { Flex, Text, Spinner } from "theme-ui";

const RenderDigits = ({
  digitsToDisplay = "default value",
  errorType,
  showSpinner,
}) => {
  return (
    <Flex
      sx={{
        marginTop: "50px",
        background: "whitesmoke",
        border: "solid",
        borderColor: errorType.negative || errorType.tooLong ? "red" : "black",
        flexDirection: "flex-start",
        padding: "20px",
        width: "50%",
        borderRadius: "30px",
      }}
    >
      <Text
        style={{
          fontSize: "30px",
          width: "100%",
          color: errorType.negative || errorType.tooLong ? "red" : "black",
          textAlign:
            errorType.negative || errorType.tooLong ? "center" : "start",
          wordBreak: "break-all",
          pb: "3rem",
        }}
      >
        {errorType.tooLong
          ? "Number of digits cannot be larger than 1000!"
          : errorType.negative
          ? "Number must be positive!"
          : digitsToDisplay}
        {showSpinner && <Spinner size={"25px"} color={"DeepSkyBlue"}></Spinner>}
      </Text>
    </Flex>
  );
};

export default RenderDigits;
