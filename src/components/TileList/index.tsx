import React, { useEffect } from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  Flex,
  Center,
  Icon,
  Text,
} from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';
import { Stock } from '../../api/stock/data-types';
import TileItem from './TileItem';

import { useAppSelector } from '../../hooks/redux';
import { useFetchStock } from '../../hooks/useFetchStock';
import { stockRequestStateSelector } from '../../api/stock/request-state';
import { StockRequestState } from '../../api/stock/data-types';

import {
  stockDataSelector,
  stockDataReadySelector,
} from '../../api/stock/response-state';

interface TileListProps {
  data?: Stock[];
}

const TileListWithLogic: React.FunctionComponent<TileListProps> = () => {
  const { loading, error } = useAppSelector<StockRequestState>(
    stockRequestStateSelector
  );
  const isDataReady = useAppSelector<boolean>(stockDataReadySelector);
  const stockData = useAppSelector<Stock[]>(stockDataSelector);

  const { fetchStockData } = useFetchStock();

  const isEmpty = stockData.length === 0;

  useEffect(() => {
    fetchStockData();
  }, []);

  if (loading && !isDataReady) {
    return (
      <Center mt={4}>
        <Spinner
          thickness="8px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  if (isDataReady && isEmpty) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        borderWidth="1px"
        borderRadius="lg"
        borderColor="gray.300">
        <Icon as={WarningIcon} boxSize={14} color="blue.500" mt={16} />
        <Text fontSize="2xl" color="gray" mt={4} mb={16}>
          No data
        </Text>
      </Flex>
    );
  }

  return (
    <React.Fragment>
      <TileList data={stockData} />
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </React.Fragment>
  );
};

const TileList: React.FunctionComponent<TileListProps> = ({ data }) => (
  <Flex
    width="100%"
    flexDirection={{ base: 'column', sm: 'row' }}
    flexWrap="wrap">
    {data.map((stock) => (
      <TileItem key={stock.id} item={stock} />
    ))}
  </Flex>
);

TileList.defaultProps = {
  data: [],
};

export default TileListWithLogic;
