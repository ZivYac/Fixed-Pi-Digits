import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Flex, Heading, Image, Input, Label, Spinner } from "theme-ui";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";

import IconEyeShow from "../components/icons/IconEyeShow";
import IconEyeHide from "../components/icons/IconEyeHide";
import LanguageSwitch from "../components/LanguageSwitch";
import { doLogin } from "../redux/slices/AuthSlice";
import logo from "../assets/images/logo.svg";
import background from "../assets/images/background.webp";

const Login = () => {
  const history = useHistory();
  const { loggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm();

  const ForgotPassword = () => {
    return <Flex>Forgot Password</Flex>;
  };

  const ShowPassword = ({ onClick, showPassword }) => {
    return (
      <Flex sx={{ position: "relative", zIndex: 2 }}>
        <Flex
          mt={!showPassword ? "0.7rem" : "0.32rem"}
          ml="-3rem"
          sx={{ position: "absolute", ":hover": { cursor: "pointer" } }}
          onClick={onClick}
        >
          {!showPassword ? <IconEyeShow /> : <IconEyeHide />}
        </Flex>
      </Flex>
    );
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      dispatch(doLogin());
    } catch (error) {
      setErrorState(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (loggedIn) history.push("/home");
  }, [history, loggedIn]);

  return (
    <Flex
      sx={{
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${background})`,
      }}
    >
      {!loggedIn && (
        <Flex
          px="4rem"
          py="3rem"
          bg="whiteSmoke"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "column",
            height: "35rem",
            width: "30rem",
            border: "solid 1px lightgrey",
            borderRadius: "10px",
          }}
          as="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Flex
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Image variant="logo" src={logo} />
            <LanguageSwitch />
          </Flex>

          <Heading sx={{ textAlign: "center", mt: "2rem" }}>
            <FormattedMessage id="lbl.log_in" />
          </Heading>

          <Flex sx={{ flexDirection: "column", width: "100%" }}>
            <Label htmlFor="username">
              <FormattedMessage id="lbl.username" />
            </Label>
            <Input
              id="username"
              name="username"
              {...register("username", {
                onChange: () => {
                  setErrorState(null);
                },
                required: true,
              })}
            />
          </Flex>

          <Flex sx={{ flexDirection: "column", width: "100%" }}>
            <Label htmlFor="password" sx={{ mt: "tiny" }}>
              <FormattedMessage id="lbl.password" />
            </Label>
            <Flex sx={{ width: "100%" }}>
              <Input
                id="password"
                name="password"
                type={!showPassword ? "password" : "text"}
                {...register("password", {
                  onChange: () => {
                    setErrorState(null);
                  },
                  required: true,
                })}
              />
              <ShowPassword
                onClick={() => setShowPassword(!showPassword)}
                showPassword={showPassword}
              />
            </Flex>
          </Flex>

          {errorState ? (
            <Flex sx={{ width: "100%", height: "2rem" }}>{errorState}</Flex>
          ) : (
            <Flex sx={{ width: "100%", justifyContent: "center" }}>
              <ForgotPassword />
            </Flex>
          )}

          <Button
            sx={{ py: "small", fontSize: "button", mt: "larger" }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Flex sx={{ justifyContent: "center", alignItems: "center" }}>
                <Spinner size={30} color="white" />
              </Flex>
            ) : (
              <FormattedMessage id="lbl.sign_in" />
            )}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Login;
