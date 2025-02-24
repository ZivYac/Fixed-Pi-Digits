import { FormattedMessage } from "react-intl";
import { Flex, Text, Spinner } from "theme-ui";
import MyButton from "./MyButton";

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
    <Flex sx={{
      marginTop: "50px",
      flexDirection: "row",
      padding: "20px",
      height: "auto",
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Flex
        sx={{
          background: "whitesmoke",
          border: "solid",
          borderColor: errorType.negative || errorType.tooLong ? "red" : "black",
          flexDirection: (errorType.negative || errorType.tooLong) ? "column" : "flex-start",
          width: "50%",
          borderRadius: "30px",
          height: "auto",
          padding: "20px",
          flexWrap: "wrap",
          alignContent: "center",
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
        <MyButton sx={{
            background: "buttonBackground",
            border: "solid",
            height: "auto",
            width: "auto",
            padding: "20px",
            fontSize: "23px",
            color: "text"
          }}
          onClick={() => {
            navigator.clipboard.writeText(digitsToDisplay);
          }}>
            <FormattedMessage id="lbl.copy"/>
        </MyButton>
      </Flex>
  );
};

export default RenderDigits;
