import { FormattedMessage } from "react-intl";
import { Flex, Text, Spinner } from "theme-ui";

const RenderDigits = ({
  digitsToDisplay = "default value",
  errorType,
  showSpinner,
  toHighlight,
}) => {
  const errors = errorType;
  const digArr = digitsToDisplay.split("");

  const renderErrors = () => {
    if(errorType.negative) {
      return (
      <Text sx={{
        fontSize: "30px",
        color: "red",
        fontWeight: "bold",
        textAlign: "center"
      }}>
        <FormattedMessage id="lbl.error_negative"/>
      </Text>)
    } else {
      return (
        <Text sx={{
          fontSize: "30px",
          color: "red",
          fontWeight: "bold",
          textAlign: "center"
        }}>
          <FormattedMessage id="lbl.error_too_long"/>
        </Text>)
    }
  }

  return (
    <Flex
      sx={{
        marginTop: "50px",
        background: "whitesmoke",
        border: "solid",
        borderColor: errorType.negative || errorType.tooLong ? "red" : "black",
        flexDirection: (errorType.negative || errorType.tooLong) ? "column" : "flex-start",
        padding: "20px",
        width: "50%",
        borderRadius: "30px",
        height: "auto",
        flexWrap: "wrap",
        overflow: "visible"
      }}
    >
      {errorType.negative || errorType.tooLong ?
      renderErrors() :
      digArr.map((dig) => {
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
