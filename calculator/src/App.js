import "./App.css";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { Table, TableCell, TableRow } from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";
import { Pie } from "react-chartjs-2";
import TableDetail from "./TableDetail";

const PrettoSlider = withStyles({
  root: { color: "#00d09c", height: 10 },
  thumb: {
    top: "11px",
    height: 25,
    width: 25,
    backgroundColor: "white",
    boxShadow: "3px 2px 5px 1px lightblue",
    border: "none",
    marginTop: -9,
    marginLeft: -9,
  },
  track: { height: 5, borderRadius: 0 },
  rail: { height: 5, borderRadius: 0 },
})(Slider);

ChartJs.register(ArcElement, Tooltip, Legend);

function App() {
  const [amount, setAmount] = useState(2755000);
  const [interest, setInterest] = useState(7);
  const [duration, setDuration] = useState(147);
  const maxValue = 10000000;
  const intMax = 30;
  const maxDuration = 360;

  const intr = interest / 1200;
  const emi = duration
    ? Math.round((amount * intr) / (1 - Math.pow(1 / (1 + intr), duration)))
    : 0;
  const totalAmt = duration * emi;
  var TotalAmountOfCredit = Math.round(
    ((emi / intr) * (1 - (Math.pow(1 + intr), -duration))) / 200
  );
  const TotalAmountOfInterest = Math.round(totalAmt - TotalAmountOfCredit);

  return (
    <div className="App">
      <h2 className="header">EMI CALCULATOR</h2>
      <div className="CalApp">
        <div className="slider">
          <div>
            <Typography gutterBottom>Loan Amount</Typography>
            <input className="inputfield" type="text" value={amount} />
            <span className="RS">₹</span>
            <PrettoSlider
              value={amount}
              onChange={(event, vAmt) => {
                setAmount(vAmt);
              }}
              defaultValue={amount}
              max={maxValue}
            />
          </div>

          <div>
            <Typography gutterBottom> Rate of interest(p.a)</Typography>
            <input className="inputfield" type="text" value={interest} />
            <span className="RS"></span>
            <PrettoSlider
              value={interest}
              onChange={(event, vInt) => {
                setInterest(vInt);
              }}
              defaultValue={interest}
              max={intMax}
            />
          </div>

          <div>
            <Typography gutterBottom>Loan Tenure (Months)</Typography>
            <input className="inputfield" type="text" value={duration} />
            <span className="RS"></span>
            <PrettoSlider
              value={duration}
              onChange={(event, vDur) => {
                setDuration(vDur);
              }}
              defaultValue={duration}
              max={maxDuration}
            />
          </div>
        </div>

        <Table>
          <TableRow>
            <TableCell>
              <TableDetail
                amount={amount}
                interest={interest}
                duration={duration}
                emi={emi}
                totalAmt={totalAmt}
                TotalAmountOfInterest={TotalAmountOfInterest}
              />
            </TableCell>

            <TableCell>
              <Pie
                style={{
                  height: "100px",
                }}
                className="pie"
                data={{
                  labels: [" Interest Amount", "Principal  Amount"],
                  datasets: [
                    {
                      data: [TotalAmountOfInterest, amount],
                      backgroundColor: ["#5367ff", "#98a4ff"],
                    },
                  ],
                }}
                width={800}
                height={800}
              >
                hey
              </Pie>
            </TableCell>
          </TableRow>
        </Table>
      </div>
    </div>
  );
}

export default App;
