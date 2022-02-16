import React from "react";
import {
  makeStyles,
  Grid,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import { TableWithActions } from "../components/TableWithActions ";
import fetchPositionsData from "../services/position";
import { socket } from "../socket";
import moment from "moment";
const styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    //height: "100%",
    overflowY: "auto",
    maxHeight: "82vh",
    flexDirection: "column",
  },
}));

const stocksUrl = "ws://stocks.mnet.website/";

const Wallet = (props) => {
  const classes = styles({ ...props });
  const [postions, setPositions] = React.useState([]);
  const [rates, setRates] = React.useState({});
  const [deposits, setDeposits] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [socketClosed, setSocketClosed] = React.useState(false);

  const [connection, setConnection] = React.useState(null);
  const [stocks, setStocks] = React.useState({});

  const updateRefresh = () => {
    setRefresh(!refresh);
  };

  const saveNewStockValues = (event) => {
    let result = JSON.parse(event.data);
    let [up_values_count, down_values_count] = [0, 0];
    let new_stocks = stocks;
    result.map((stock) => {
      //console.log(stock);
      if (stocks[stock[0]]) {
        new_stocks[stock[0]].current_value = Number(stock[1]);
        new_stocks[stock[0]].history.push({
          value: Number(stock[1]),
        });
      } else {
        new_stocks[stock[0]] = {
          current_value: stock[1],
          history: [{ time: Date.now(), value: Number(stock[1]) }],
          is_selected: false,
        };
      }
      setStocks(new_stocks);
    });
  };

  React.useEffect(() => {
    let con = new WebSocket(stocksUrl);
    con.onmessage = saveNewStockValues;
    con.onclose = () => {
      setSocketClosed(true);
    };
    setConnection(con);
  }, []);

  React.useEffect(() => {
    //const socket = socketIOClient(ENDPOINT);
    socket.on("reload", (data) => {
      // console.log(data)
      setRefresh(!refresh);
    });
  }, []);

  //React.useEffect(() => {});
  React.useEffect(() => {
    fetchPositionsData()
      .then((response) => response.json())
      .then((res) => {
        setRates(res.rates);
        setDeposits(res.deposits);

        let current_time = Date.now();
        let appData = res.data.map((el) => ({
          ...el,
          updateAt: moment(current_time).format("YYYY-MM-DD hh:mm:ss.s"),
        }));

        /*if (connection) {
          res.data.map((el) => {
            const API_KEY = "HGJWFG4N8AQ66ICD";
            let StockSymbol = el.symbol;
            let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
            fetch(API_Call)
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                console.log(data);
              })
              .catch((err) => console.log(err));
          });
        }*/
        setPositions(appData);
      });
  }, [refresh]);

  let expenses = 0;
  let wallet = 0;
  let variationPercent = 0;
  if (postions.length > 0) {
    expenses = postions
      .map((item) => item.book_value.amount)
      .reduce((prev, next) => prev + next);
    wallet = postions
      .map((item) => {
        if (item.market_book_value.currency !== "CAD") {
          let transfert =
            item.quantity * parseFloat(item.quote.amount) * rates.USD.sell_rate;

          return transfert;
        } else {
          let value = item.quantity * parseFloat(item.quote.amount);
          return value;
        }
      })
      .reduce((prev, next) => prev + next);
  }
  if (expenses !== 0 && wallet !== 0) {
    variationPercent = ((wallet - expenses) / expenses) * 100;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", color: "white" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          //backgroundColor: "white",
          margin: "0 0 2rem 0",
          height: "60px",
          width: "100%",
          padding: " 1rem",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ color: "aquamarine" }}>
          {"Net expenses : " + expenses + " $CAD"}
        </h2>
        <h2 style={{ color: "orange" }}>{"Wallet : " + wallet + " $CAD"}</h2>
        <h2 style={{ color: variationPercent >= 0 ? "green" : "red" }}>
          {" %variation: " + variationPercent + " %"}
        </h2>
        <h2 style={{ color: wallet - expenses >= 0 ? "green" : "red" }}>
          {" Total Gain : " + (wallet - expenses) + " $CAD"}
        </h2>
      </div>
      <Grid container className={classes.root}>
        <TableWithActions
          setRefresh={() => {
            setRefresh(!refresh);
          }}
          data={postions}
        />
      </Grid>
    </div>
  );
};

export default Wallet;
