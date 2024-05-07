import { Button, Center, Flex, useToast } from "@chakra-ui/react";
import { useCallback, useState } from "react";

import InputField from "../InputField";

import {
  CALC_ACTIONS,
  CALC_CLEAR_ACTION,
  CALC_COUNT_ACTION,
  isNumber,
  MAX_FRACTION_DIGITS,
  OPERATORS,
} from "../../constants";

const INPUT1 = "input1";
const INPUT2 = "input2";

const INITITAL_CALC_VALUES = {
  [INPUT1]: "",
  [INPUT2]: "",
};

const INITIAL_ERRORS = {
  error1: "",
  error2: "",
};

interface CalculatorProps {
  onSubmit: (result: Number) => any;
  onClear: () => any;
}

const Calculator = ({ onSubmit, onClear }: CalculatorProps) => {
  const toast = useToast();
  const [calcValues, setCalcValues] = useState({
    ...INITITAL_CALC_VALUES,
  });

  const [error, setError] = useState({
    ...INITIAL_ERRORS,
  });

  const [selectedOP, setSelectedOP] = useState("");

  const handleChange = (value: string, key: string) => {
    let val = value.trim().replace(/,/g, "");
    if (isNumber(val) || val === "") {
      if (val.indexOf(".") === -1) {
        val = val;
      } else {
        if (val.length - (val.indexOf(".") + 1) <= MAX_FRACTION_DIGITS) {
          val = val === "." ? "0." : val;
        }
      }
      setCalcValues({ ...calcValues, [key]: val });
    }
  };

  const handleSubmit = () => {
    let isError = false;
    let error1 = "";
    let error2 = "";
    console.log("****** CalcVallues ", calcValues);
    if (!calcValues[INPUT1]) {
      error1 = "Enter value";
      isError = true;
    }
    if (!calcValues[INPUT2]) {
      error2 = "Enter value";
      isError = true;
    }
    if (error1 || error2) {
      setError({
        error1,
        error2,
      });
      return;
    }
    if (!selectedOP) {
      toast({
        title: "Select Operator",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      isError = true;
    }

    if (!isError) {
      const result = eval(
        `${calcValues[INPUT1]}${selectedOP}${calcValues[INPUT2]}`
      );
      onSubmit(result);
      setSelectedOP("");
      setError({ ...INITIAL_ERRORS });
      setCalcValues({
        ...INITITAL_CALC_VALUES,
        [INPUT1]: result.toString(),
      });
    }
  };

  const handleClear = useCallback(() => {
    setCalcValues({ ...INITITAL_CALC_VALUES });
    setError({ ...INITIAL_ERRORS });
    setSelectedOP("");
    onClear();
  }, []);

  const handleActions = useCallback(
    (action: string) => {
      switch (action) {
        case CALC_COUNT_ACTION: {
          handleSubmit();
          return;
        }
        case CALC_CLEAR_ACTION: {
          handleClear();
          return;
        }
      }
    },
    [handleSubmit]
  );

  return (
    <Center
      flexDir="column"
      gap="1.5rem"
      maxW="420px"
      w="100%"
      h="100%"
      bg="#FFB3F0"
      height="auto"
      p={{ base: "32px 16px", md: "48px 32px" }}
      boxShadow="base"
      borderRadius="32px"
    >
      <InputField
        value={calcValues.input1}
        onChange={(val) => handleChange(val, INPUT1)}
        error={error.error1}
      />
      <Flex
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        gap="24px"
      >
        {OPERATORS.map((operator) => (
          <Button
            w="25%"
            h={{ base: "48px", md: "56px" }}
            borderRadius="24px"
            onClick={() => setSelectedOP(operator)}
            border="1px solid"
            key={operator}
            borderColor={
              selectedOP === operator ? "textPrimary" : "backgroundDivider"
            }
          >
            {operator}
          </Button>
        ))}
      </Flex>
      <InputField
        value={calcValues.input2}
        onChange={(val) => handleChange(val, INPUT2)}
        error={error.error2}
      />
      <Flex
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        gap="16px"
      >
        {CALC_ACTIONS.map((action) => (
          <Button
            w="50%"
            h={{ base: "48px", md: "56px" }}
            borderRadius="24px"
            onClick={() => handleActions(action.title)}
            border="1px solid"
            borderColor="backgroundDivider"
            key={action.title}
            //   bg={action.type === "primary" ? "textPrimary" : "inherit"}
          >
            {action.title}
          </Button>
        ))}
      </Flex>
    </Center>
  );
};

export default Calculator;
