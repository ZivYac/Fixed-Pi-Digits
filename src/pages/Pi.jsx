//Imports from react open source
import React, { useEffect, useState, useRef } from "react";
import { Text, Flex, Input, ThemeProvider } from "theme-ui";
import { useDispatch, useSelector } from "react-redux";

import { getPiDigits } from "../redux/slices/PiSlice";
import MyButton from "../components/MyButton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Title from "../components/Title";
import RenderDigits from "../components/RenderDigits";
import { FormattedMessage } from "react-intl";

import { theme } from "../common/theme";

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
  const increaseInterval = useRef(null);
  const [selectedRadioButton, setSelectedRadioButton] = useState(10);
  const [serachNumber, setSearchNumber] = useState('');
  const [disablePause, setDisablePause] = useState(false);
  const [foundIndexes, setFoundIndexes] = useState([]);

  useEffect(() => {
    setDisablePause(digitsToDisplay.length - 2 === numDigits);
  }, [digitsToDisplay]);

  //--------------------------------------------------------------
  //Use effect to print every second 1 digit
  useEffect(() => {
    // add 1 character to the display string
    const printDigits = () => {
      if (isStart && digitsToDisplay !== null && piDigits){
          setDigitsToDisplay(digitsToDisplay + piDigits.charAt (digitsToDisplay.length - 2));
      }
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
    if (numDigits === "") setNumDigits(0);
    if(numDigits > 0) setNumDigits(numDigits => Math.max(Number(numDigits) - 1, 0));
      if(numDigits <= 1000) errorType.tooLong = false;
    setIsStart(false);
  };
  //--------------------------------------------------------------
  //Handle plus function, sub 1 from  numDigits
  const handlePlus = () => {
    if (numDigits === "") setNumDigits(1);
    if(numDigits >= 1000) errorType.tooLong = true;
    setNumDigits(numDigits => Number(numDigits) + 1)
    setIsStart(false);
  };
  //--------------------------------------------------------------
  const handlePause = () => {
    setIsStart(!isStart);
    setPause(!pause);
  };
  //--------------------------------------------------------------
  const handleStart = () => {
    if(!isStart) setPause(true);
    setDisablePause(false);
    setIsStart(true);
    setDigitsToDisplay("3.");
    dispatch(getPiDigits(numDigits));
    setisRefreshed(false);
  };
  //--------------------------------------------------------------
  const handleRefresh = () => {
    setIsStart(false);
    setPause(true);
    setDigitsToDisplay("3.");
    setisRefreshed(true);
    setNumDigits(20);
  };
  //--------------------------------------------------------------
  const changeNumDigit = (value) => {
    if(value === '' || value ==='0'|| Number(value) ) {
      if(value > 1000 && value !== '')  errorType.tooLong = true;
      else errorType.tooLong = false;
      handleRefresh();
      setNumDigits(value || "");
    }
  };
  //--------------------------------------------------------------

  const handleMouseDownIncrease = () => {
    if(increaseInterval.current)
      handleMouseUp();
    increaseInterval.current = setInterval(handlePlus, 50);
  }
  const handleMouseUp = () => {
    clearInterval(increaseInterval.current);
    increaseInterval.current = null;
  }

  const handleMouseDownDecrease = () => {
    if(increaseInterval.current)
      handleMouseUp();
    increaseInterval.current = setInterval(handleMinus, 50);
  }

  const changeSearchNum = (value) => {
    if(value === '' || (Number(value) && value.length < 1000)) {
      setSearchNumber(value);
    }
  }
  const findIndexes = (num) => {
    dispatch(getPiDigits(numDigits));
    const found = [];
    let index = piDigits.indexOf(num);
    while(index !== -1) {
      found.push(index);
      index = piDigits.indexOf(num, index + 1);
    }
    return found;
  }
  const handleSearch = (value) => {
    if(value === '') setFoundIndexes([]);
    else {
      const indexes = findIndexes(value);
      setFoundIndexes(indexes);
    }
  }

  return (
    <ThemeProvider theme={theme}>
    <Flex
      id="main_flex"
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        background: "mainBackground",
        minHeight: "100vh",
      }}
    >
      <Header />

      <Text></Text>

      <Flex
        id="Body"
        sx={{
          background: "mainBackground",
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
        id="AllBoxes"
        sx={{
          background: "mainBackground",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-around",
          height: "100%",
          width: "100%",
          py: "20px",
          my: "auto",
        }}>

          <Flex 
            sx={{
              background: "boxesBackground",
              border: "solid",
              borderRadius: "30px",
              height: "280px",
              justifyContent: "space-between",
              marginTop: "50px",
              py: "20px",
              width: "25%",
              flexDirection: "column"
            }}>
              <Input
              className="SearchInput" 
              sx={{
                color: "text",
                background: "buttonBackground",
                marginBottom: "5px"
              }}
              type="text"
              value = {serachNumber}
              onChange={(e) => {
                changeSearchNum(e.target.value);
              }}
              ></Input>
              <Flex
                id="FoundIndexes"
                className="FoundIndexes"
                sx={{
                  background: "boxesBackground",
                  height: "100%",
                  maxHeight: "100%",
                  justifyContent: "space-between",
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gridTemplateRows: "repeat(4, 1fr)",
                  overflow: 
                  foundIndexes.length > 10 ? "scroll" : "hidden"
                }}>
                  {foundIndexes.map((item) => {
                        return (
                        <Text
                        sx={{
                          background: "buttonBackground",
                          border: "solid",
                          borderRadius: "30px",
                          textAlign: "center"
                        }}
                        >
                        {item}
                        </Text>
                      );
                    })}
              </Flex>
              <MyButton
                sx={{
                  backgroundColor: "buttonBackground",
                  color: "text",
                  width: "auto",
                  textAlign: "center"
                }}
                onClick={() => {handleSearch(document.querySelector('.SearchInput').value);}}
                >
                Search
              </MyButton>
          </Flex>

          <Flex
            id="main box"
            sx={{
              alignItems: "center",
              background: "boxesBackground",
              border: "solid",
              borderRadius: "30px",
              flexDirection: "column",
              height: "280px",
              justifyContent: "space-between",
              marginTop: "50px",
              py: "20px",
              width: "25%"
            }}
          >
            


            <FormattedMessage id="lbl.number_of_digits" />
            <Flex id="plusMinus-container">
              <MyButton sx={{
                backgroundColor: "minusPause",
                color: "text",
                width: "auto",
                textAlign: "center"
              }}
              disabled={numDigits <= 0}
              onMouseDown={handleMouseDownDecrease}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}>
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
              <MyButton sx={{
                backgroundColor: "plusStart",
                color: "text",
                width: "auto",
                textAlign: "center"
              }} 
              onMouseDown={handleMouseDownIncrease}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}>
                +
              </MyButton>
            </Flex>

            <Flex
              id="action-container"
              sx={{ width: "100%", justifyContent: "space-around" }}
            >
              <MyButton
                sx={{
                  width: "auto",
                  backgroundColor: "minusPause",
                  width: "auto",
                  color: "text",
                }} 
                onClick={handlePause}
                disabled={
                  !numDigits ||
                  errorType.negative ||
                  errorType.tooLong ||
                  isRefreshed || 
                  disablePause
                }
              >
                {pause ?   <FormattedMessage id="lbl.pause_button" /> :   <FormattedMessage id="lbl.unpause_button" />}
              </MyButton> 
              <MyButton sx={{
                backgroundColor: "plusStart",
                color: "text",
                width: "auto",
                textAlign: "center"
              }} 
                disabled={isStart || !numDigits}
                onClick={handleStart}
              >
                <FormattedMessage id="lbl.start_button" />
              </MyButton>
            </Flex>
            <MyButton bg="lightgreen" onClick={handleRefresh}>
            <FormattedMessage id="lbl.refresh_button" />
            </MyButton>
        </Flex>

        <Flex id="SelectHighlight"
        sx={{
          background: "boxesBackground",
          border: "solid",
          borderRadius: "30px",
          height: "280px",
          justifyContent: "space-between",
          marginTop: "50px",
          py: "20px",
          width: "25%",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(4, 1fr)",
          gap: "1rem"
        }}>
            <Input
              type="radio" 
              name="highlightDig"
              value="1"
              sx={{
              position: "relative",
              borderRadius:"20px",
              background: selectedRadioButton === 1 ? "selectedBackground" : "buttonBackground",
              display: "block",
              "&::after": {
                color: "text",
                content: '"1"',
                position: "absolute",
                textAlign: "center",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
              }
            }}
            onClick={() => {setSelectedRadioButton(1)}}/>
            <Input 
              type="radio" 
              name="highlightDig"
              value="2"
              sx={{
                position: "relative",
                borderRadius:"20px",
                background: selectedRadioButton === 2 ? "selectedBackground" : "buttonBackground",
                display: "block",
                "&::after": {
                  color: "text",
                  content: '"2"',
                  position: "absolute",
                  textAlign: "center",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)"
                }
              }}
            onClick={() => {setSelectedRadioButton(2)}}/>
            <Input
              type="radio" 
              name="highlightDig"
              value="3"
              sx={{
              position: "relative",
              borderRadius:"20px",
              background: selectedRadioButton === 3 ? "selectedBackground" : "buttonBackground",
              display: "block",
              "&::after": {
                color: "text",
                content: '"3"',
                position: "absolute",
                textAlign: "center",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
              }
            }}
            onClick={() => {setSelectedRadioButton(3)}}/>
            <Input
              type="radio" 
              name="highlightDig"
              value="4"
              sx={{
              position: "relative",
              borderRadius:"20px",
              background: selectedRadioButton === 4 ? "selectedBackground" : "buttonBackground",
              display: "block",
              "&::after": {
                color: "text",
                content: '"4"',
                position: "absolute",
                textAlign: "center",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
              }
            }}
            onClick={() => {setSelectedRadioButton(4)}}/>
            <Input
              type="radio" 
              name="highlightDig"
              value="5"
              sx={{
              position: "relative",
              borderRadius:"20px",
              background: selectedRadioButton === 5 ? "selectedBackground" : "buttonBackground",
              display: "block",
              "&::after": {
                color: "text",
                content: '"5"',
                position: "absolute",
                textAlign: "center",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
              }
            }}
            onClick={() => {setSelectedRadioButton(5)}}/>
            <Input
              type="radio" 
              name="highlightDig"
              value="6"
              sx={{
              position: "relative",
              borderRadius:"20px",
              background: selectedRadioButton === 6 ? "selectedBackground" : "buttonBackground",
              display: "block",
              "&::after": {
                color: "text",
                content: '"6"',
                position: "absolute",
                textAlign: "center",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
              }
            }}
            onClick={() => {setSelectedRadioButton(6)}}/>
            <Input
              type="radio" 
              name="highlightDig"
              value="7"
              sx={{
              position: "relative",
              borderRadius:"20px",
              background: selectedRadioButton === 7 ? "selectedBackground" : "buttonBackground",
              display: "block",
              "&::after": {
                color: "text",
                content: '"7"',
                position: "absolute",
                textAlign: "center",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
              }
            }}
            onClick={() => {setSelectedRadioButton(7)}}/>
            <Input
              type="radio" 
              name="highlightDig"
              value="8"
              sx={{
              position: "relative",
              borderRadius:"20px",
              background: selectedRadioButton === 8 ? "selectedBackground" : "buttonBackground",
              display: "block",
              "&::after": {
                color: "text",
                content: '"8"',
                position: "absolute",
                textAlign: "center",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
              }
            }}
            onClick={() => {setSelectedRadioButton(8)}}/>
            <Input
              type="radio" 
              name="highlightDig"
              value="9"
              sx={{
              position: "relative",
              borderRadius:"20px",
              background: selectedRadioButton === 9 ? "selectedBackground" : "buttonBackground",
              display: "block",
              "&::after": {
                color: "text",
                content: '"9"',
                position: "absolute",
                textAlign: "center",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
              }
            }}
            onClick={() => {setSelectedRadioButton(9)}}/>
            <Input
              type="radio" 
              name="highlightDig"
              value="0"
              sx={{
              position: "relative",
              borderRadius:"20px",
              background: selectedRadioButton === 0 ? "selectedBackground" : "buttonBackground",
              display: "block",
              "&::after": {
                color: "text",
                content: '"0"',
                position: "absolute",
                textAlign: "center",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
              }
            }}
            onClick={() => {setSelectedRadioButton(0)}}/>
            <Input
              type="radio" 
              name="highlightDig"
              value="10"
              sx={{
              position: "relative",
              borderRadius:"20px",
              background: selectedRadioButton === 10 ? "selectedBackground" : "buttonBackground",
              display: "block",
              gridColumn: "span 2",
              "&::after": {
                color: "text",
                content: '"None"',
                position: "absolute",
                textAlign: "center",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
              }
            }}
            onClick={() => {setSelectedRadioButton(10)}}/>
        </Flex>


        </Flex>
        <RenderDigits
          digitsToDisplay={digitsToDisplay}
          errorType={errorType}
          showSpinner={
            isStart &&
            digitsToDisplay !== null &&
            digitsToDisplay.length - 2 !== numDigits
          }
        />
      </Flex>
      <Footer />
    </Flex>
    </ThemeProvider>
  );
};
//================================================================================
//Export Pi component
export default Pi;
