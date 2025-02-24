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
import { useIntl } from "react-intl";

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
  const [searchNumber, setSearchNumber] = useState('');
  const [disablePause, setDisablePause] = useState(false);
  const [foundIndexes, setFoundIndexes] = useState([]);
  const [startSearch, setStartSearch] = useState(true);
  const [noneText, setNoneText] = useState();
  const intl = useIntl();
  const [searchDigits, setSearchDigits] = useState('');

  dispatch({ type: "auth/setLoggedIn", payload: false });
  localStorage.clear();
  sessionStorage.clear();

  useEffect(() => {
    const getDigits = async () => {
      if(!searchDigits) setSearchDigits(await dispatch(getPiDigits(1000)).unwrap());
    }
    getDigits();
  }, [startSearch]);

  useEffect(() => {
    const negative = numDigits < 0;
    const tooLong = numDigits > 1000;
    setErrorType({negative, tooLong});
  }, [numDigits]);

  useEffect(() => {
    setNoneText(intl.formatMessage({id: "lbl.none"}))
  }, [intl.locale]);

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
    if(numDigits <= 1001) errorType.tooLong = false;
    if(numDigits > 0) setNumDigits(numDigits => Math.max(Number(numDigits) - 1, 0));
    setIsStart(false);
    setDisablePause(true);
  };
  //--------------------------------------------------------------
  //Handle plus function, sub 1 from  numDigits
  const handlePlus = () => {
    if (numDigits === "") setNumDigits(1);
    if(numDigits >= 1000) errorType.tooLong = true;
    setNumDigits(numDigits => Number(numDigits) + 1)
    setIsStart(false);
    setDisablePause(true);
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
    if(numDigits > 1000)
      setErrorType({negative: false, tooLong: false});
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
    if(value === '' || ((Number(value) === 0 || Number(value)) && value.length < 1000)) {
      setSearchNumber(value.trim());
    }
  }
  useEffect(() => {
    if(searchDigits && searchNumber) findIndexes(searchNumber);
    else setFoundIndexes([]);
  }, [startSearch]);
  
  useEffect(() => {
    dispatch(getPiDigits(numDigits));
  }, [numDigits]);

  const findIndexes = (num) => {
    num = num.trim();
    const found = [];
    let index = String(searchDigits).indexOf(num);
    while(index !== -1 && index < 1001) {
      found.push(index);
      index = String(searchDigits).indexOf(num, index + 1);
    }
    setFoundIndexes(found);
  }

  const handleSearch = () => {
    setStartSearch(!startSearch);
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
              value = {searchNumber}
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
                  overflowY: 
                  foundIndexes.length > 10 ? "scroll" : "hidden",
                  overflowX: "hidden"
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
                onClick={() => {handleSearch();}}
                >
                <FormattedMessage id="lbl.search"/>
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
                disabled={isStart || !numDigits || numDigits > 1000}
                onClick={handleStart}
              >
                <FormattedMessage id="lbl.start_button" />
              </MyButton>
            </Flex>
            <MyButton sx={{
              background: "refresh",
              color: "text"
            }}
            onClick={handleRefresh}>
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
          {[1,2,3,4,5,6,7,8,9,0].map((buttonNumber) => {
              return (
                <Input
                type="radio" 
                name="highlightDig"
                value={buttonNumber}
                sx={{
                position: "relative",
                borderRadius:"20px",
                background: selectedRadioButton === buttonNumber ? "selectedBackground" : "buttonBackground",
                display: "block",
                "&::after": {
                  color: "text",
                  content: `"${buttonNumber}"`,
                  position: "absolute",
                  textAlign: "center",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)"
                }
              }}
              onClick={() => {setSelectedRadioButton(buttonNumber)}}
              />
            );
          })}
          <Input
                type="radio" 
                name="highlightDig"
                value="10"
                sx={{
                position: "relative",
                borderRadius:"20px",
                gridColumn: "span 2",
                background: selectedRadioButton === 10 ? "selectedBackground" : "buttonBackground",
                display: "block",
                "&::after": {
                  color: "text",
                  content: `"${noneText}"`,
                  position: "absolute",
                  textAlign: "center",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)"
                }
              }}
              onClick={() => {setSelectedRadioButton(10)}}
              />
        </Flex>


        </Flex>
          <RenderDigits sx={{
            height: "100%",
          }}
            digitsToDisplay={digitsToDisplay}
            errorType={errorType}
            toHighlight={selectedRadioButton}
            showSpinner={
              isStart &&
              digitsToDisplay !== null &&
              !disablePause
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
