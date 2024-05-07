import { useCallback, useState } from "react";

import { Center, Flex, Text } from "@chakra-ui/react";

import Calculator from "../components/Calculator";
import LineChart from "../components/LineChart";
import { addDays, formatDate } from "../constants";

export default function Page() {
  const [chartLabels, setChartLabels] = useState<Array<string>>([]);
  const [chartValues, setChartVales] = useState<Array<Number>>([]);

  const onClear = useCallback(() => {
    setChartLabels([]);
    setChartVales([]);
  }, []);

  const onCalc = useCallback(
    (res: Number) => {
      setChartVales([...chartValues, res]);
      if (chartLabels.length > 0) {
        setChartLabels([
          ...chartLabels,
          formatDate(addDays(chartLabels.length)),
        ]);
      } else {
        setChartLabels([formatDate(addDays(0))]);
      }
    },
    [chartLabels, chartValues]
  );

  return (
    <div>
      <Center alignItems="center" position="absolute" w="100%">
        <Text
          mt={{ base: "32px", md: "48px" }}
          fontSize={{ base: "32px", md: "56px" }}
          bgGradient="linear(to-l, #FFB3F0, #075A5A)"
          bgClip="text"
          fontWeight="extrabold"
        >
          Calculator
        </Text>
      </Center>
      <Flex
        h="100vh"
        w="100%"
        p={{ base: "0 16px", md: 0 }}
        flexDir={{ base: "column", lg: "row" }}
        alignItems="center"
        justifyContent="center"
        gap={{ base: "48px", lg: "128px" }}
      >
        <Calculator onSubmit={(res) => onCalc(res)} onClear={() => onClear()} />
        <LineChart labels={[...chartLabels]} data={[...chartValues]} />
      </Flex>
    </div>
  );
}
