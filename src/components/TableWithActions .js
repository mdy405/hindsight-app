import React from "react";
import MaterialTable from "material-table";
import tableIcons from "./MaterialTableIcons";
import theme from "../theme";
import moment from "moment";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

const theme2 = createMuiTheme({
  palette: {
    type: "dark",
  },
});
const data = [
  { name: "Mohammad", surname: "Faisal", birthYear: 1995 },
  { name: "Nayeem Raihan ", surname: "Shuvo", birthYear: 1994 },
];

const columns = [
  { title: "Symbol", field: "symbol" },
  { title: "Name", field: "name" },
  { title: "WS market price", field: "value", type: "numeric" },
  { title: "Total Value", field: "totValue", type: "numeric" },
  { title: "Total Buy", field: "avgCost", type: "numeric" },
  { title: "Variation", field: "variation", type: "numeric" },
  { title: "% variation", field: "variationPercent", type: "numeric" },
  { title: "Qty", field: "quantity", type: "numeric" },
  { title: "Currency", field: "currency" },
  { title: "Update At", field: "updateAt" },
];

export const TableWithActions = (props) => {
  const { data, setRefresh } = props;
  return (
    <ThemeProvider theme={theme2}>
      <MaterialTable
        title="Your Positions"
        actions={[
          {
            icon: tableIcons.Delete,
            tooltip: "Delete User",
            onClick: (event, rowData) =>
              alert("You want to delete " + rowData.name),
          },
          {
            icon: tableIcons.Add,
            tooltip: "Add User",
            isFreeAction: true,
            onClick: (event) => alert("You want to add a new row"),
          },
          {
            icon: tableIcons.Refresh,
            tooltip: "Refresh Data",
            isFreeAction: true,
            onClick: () => {
              setRefresh();
            },
          },
        ]}
        icons={tableIcons}
        columns={columns}
        data={data}
        /*options={{
          selection: true,
        }}*/
      />
    </ThemeProvider>
  );
};
