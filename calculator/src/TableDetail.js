import React from "react";
import { Table, div, TableRow } from "@material-ui/core/";

export default function TableDetail(props) {
  return (
    <Table style={{ width: "100%" }} aria-label="simple table">
      <div className="table">
        <div className="details">Principal Amount</div>
        <div className="value">₹{props.amount}</div>
      </div>

      <TableRow>
        <div className="details">Monthly EMI</div>
        <div className="value">₹{props.emi}</div>
      </TableRow>

      <TableRow>
        <div className="details">Total Interest</div>
        <div className="value">₹{props.TotalAmountOfInterest}</div>
      </TableRow>

      <TableRow>
        <div className="details">
          Total Amount
          <br />
        </div>
        <div className="value">₹{props.totalAmt ? props.totalAmt : 0}</div>
      </TableRow>
    </Table>
  );
}
