import { Flex, Input, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { formatNumber, MAX_FRACTION_DIGITS } from "../../constants";

interface InputProps {
  value: string;
  onChange(val: string): void;
  error?: string;
}

const InputField = ({ value, error, onChange }: InputProps) => {
  const updatedValueWithComma = useMemo(() => {
    if (!value) return "";
    const values = value.split(".");
    const beforeDecimal = values[0];
    const afterDecimal =
      values.length > 1
        ? `.${values[1].substring(0, MAX_FRACTION_DIGITS)}`
        : "";
    return formatNumber(Number(beforeDecimal)) + afterDecimal;
  }, [value]);

  return (
    <Flex flexDir="column" gap="8px" w="100%">
      <Input
        type="text"
        placeholder="0.0"
        value={updatedValueWithComma}
        h={{ base: "62px", md: "76px" }}
        onChange={(e) => onChange(e.target.value)}
        borderRadius="1rem"
        p={{
          base: "1.5rem 1rem",
          md: "1.5rem",
        }}
        isInvalid={!!error}
        fontWeight="600"
        fontSize={{
          base: "24px",
          md: "32px",
        }}
        color={value ? "textPrimary" : "textInput"}
        _placeholder={{
          color: "textInput",
        }}
        borderColor={error ? "error" : "seperator"}
        _focus={{
          boxShadow: "none",
          outline: "none",

          borderColor: error ? "error" : "primary",
          borderWidth: "1px",
          _disabled: {
            borderColor: "seperator",
          },
        }}
        textAlign="right"
        bg="backgroundPrimary"
        _hover={{
          borderColor: error ? "error" : "primary",
          borderWidth: "1px",
          _disabled: {
            borderWidth: "1px",
            borderColor: "seperator",
          },
        }}
      />
      {error && (
        <Flex alignItems="center">
          <Text ml="0.5rem" color="error" fontSize="14px" fontWeight="400">
            {error}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default InputField;
