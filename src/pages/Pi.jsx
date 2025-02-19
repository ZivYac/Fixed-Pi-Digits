//Imports from react open source
import React, { useEffect, useState } from "react";
import { Text, Flex, Input } from "theme-ui";
import { useDispatch, useSelector } from "react-redux";

import { getPiDigits } from "../redux/slices/PiSlice";
import MyButton from "../components/MyButton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Title from "../components/Title";
import RenderDigits from "../components/RenderDigits";

//================================================================================
const Pi = () => {
  // Use dispatch to call redux functions
  const dispatch = useDispatch();
  // Use selector to get the piDigits from the store
  const { piDigits } = useSelector((state) => state.PiSlice);

  // Number of digits to fetch from the api
  const [numDigits, setNumDigits] = useState(20);
  // Digits to Display
  const [digitsToDisplay, setDigitsToDisplay] = useState("3.");
  // Boolean to verfiy if start button pressed
  const [isStart, setIsStart] = useState(false);
  // Boolean flag pause
  const [pause, setPause] = useState(false);
  // boolean to return the app to its initial state
  const [isRefreshed, setisRefreshed] = useState(true);
  // validations on input
  const [errorType, setErrorType] = useState({
    negative: false,
    tooLong: false,
  });
  //--------------------------------------------------------------
  //Use effect to print every second 1 digit
  useEffect(() => {
    // add 1 character to the display string
    const printDigits = () => {
      if (isStart && digitsToDisplay !== null)
        setDigitsToDisplay(
          digitsToDisplay + piDigits.charAt(digitsToDisplay.length)
        );
    };

    // calls a function at specified intervals (in milliseconds)
    const interval = setInterval(() => {
      // the function we want to call
      printDigits();
      //the interval
    }, 500);
    return () => clearInterval(interval);
  }, [isStart, digitsToDisplay, piDigits, numDigits]);

  //--------------------------------------------------------------
  //Handle minus function, sub 1 from  numDigits
  const handleMinus = () => {
    setNumDigits(numDigits - 1);
    setIsStart(false);
  };
  //--------------------------------------------------------------
  //Handle plus function, sub 1 from  numDigits
  const handlePlus = () => {
    if (numDigits === "") setNumDigits(1);
    else setNumDigits(numDigits + 1);
    setIsStart(false);
  };
  //--------------------------------------------------------------
  const handlePause = () => {
    setIsStart(!isStart);
    setPause(!pause);
  };
  //--------------------------------------------------------------
  const handleStart = () => {
    setIsStart(true);
    setDigitsToDisplay("3.");
    dispatch(getPiDigits(numDigits));
    setisRefreshed(false);
  };
  //--------------------------------------------------------------
  const handleRefresh = () => {
    setIsStart(false);
    setPause(false);
    setDigitsToDisplay("3.");
    setisRefreshed(true);
    setNumDigits(20);
  };
  //--------------------------------------------------------------
  const changeNumDigit = (value) => {
    handleRefresh();
    setNumDigits(value || "");
  };
  //--------------------------------------------------------------

  return (
    <Flex
      id="main_flex"
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        background: "#292A32",
        minHeight: "100vh",
      }}
    >
      <Header />

      <Flex
        id="Body"
        sx={{
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "100%",
          py: "20px",
          my: "auto",
        }}
      >
        <Title />

        <Flex
          id="main box"
          sx={{
            alignItems: "center",
            background: "whitesmoke",
            border: "solid",
            borderRadius: "30px",
            flexDirection: "column",
            height: "280px",
            justifyContent: "space-between",
            marginTop: "50px",
            py: "20px",
            width: "15%",
          }}
        >
          <Text>Number of digits</Text>
          <Flex id="plusMinus-container">
            <MyButton backgroundColor="coral" onClick={handleMinus}>
              -
            </MyButton>
            <Input
              sx={{
                marginX: "10px",
                textAlign: "center",
                width: "100px",
                borderRadius: "10px",
                borderWidth: "2px",
                outlineColor:
                  errorType.negative || errorType.tooLong ? "red" : "black",
                borderColor:
                  errorType.negative || errorType.tooLong ? "red" : "black",
              }}
              value={numDigits}
              onChange={(e) => {
                changeNumDigit(e.target.value);
              }}
            />
            <MyButton backgroundColor="DeepSkyBlue" onClick={handlePlus}>
              +
            </MyButton>
          </Flex>

          <Flex
            id="action-container"
            sx={{ width: "100%", justifyContent: "space-around" }}
          >
            <MyButton
              disabled={
                (!piDigits && isRefreshed) ||
                digitsToDisplay.length === numDigits + 2 ||
                !numDigits ||
                errorType.negative ||
                errorType.tooLong
              }
              onClick={handlePause}
              bg="coral"
              sx={{ width: "100px" }}
            >
              {pause ? "unPause" : "pause"}
            </MyButton>
            <MyButton
              disabled={isStart || !numDigits}
              onClick={handleStart}
              bg="DeepSkyBlue"
              sx={{ width: "100px" }}
            >
              Start
            </MyButton>
          </Flex>
          <MyButton bg="lightgreen" onClick={handleRefresh}>
            Refresh
          </MyButton>
        </Flex>
        <RenderDigits
          digitsToDisplay={digitsToDisplay}
          errorType={errorType}
          showSpinner={
            isStart &&
            digitsToDisplay !== null &&
            digitsToDisplay.length !== numDigits + 2
          }
        />
      </Flex>
      <Footer />
    </Flex>
  );
};
//================================================================================
//Export Pi component
export default Pi;
