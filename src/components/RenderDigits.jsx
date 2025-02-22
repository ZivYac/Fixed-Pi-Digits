import { Flex, Text, Spinner } from "theme-ui";

const RenderDigits = ({
  digitsToDisplay = "default value",
  errorType,
  showSpinner,
  toHighlight,
}) => {
  const digArr = digitsToDisplay.split("");
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
        height: "auto",
        flexWrap: "wrap",
        overflow: "visible"
      }}
    >
      {digArr.map((dig) => {
        return(
          <Text sx={{
            fontSize: "30px",
            height: "30px",
            color: dig === String(toHighlight) ? "highlightText" : "#000",
          }}>
            {dig}
          </Text>
        );
      })}
      {showSpinner && <Spinner size={"25px"} color={"DeepSkyBlue"}></Spinner>}
    </Flex>
  );
};

export default RenderDigits;
