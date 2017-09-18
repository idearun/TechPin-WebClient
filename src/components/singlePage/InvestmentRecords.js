import React from "react";

import { Link } from "react-router";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const getDate = (monthIndex, year) => {
  let date = "";
  if (monthIndex) {
    date += months[monthIndex].substring(0, 3) + ", ";
  }
  if (year) {
    date += year;
    return date;
  }
  return "Undisclosed";
};

const InvestmentRow = ({
  amount,
  invested_on = {},
  investor = {},
  link,
  month,
  text,
  year,
  type
}) => (
  <tr className="investment-row">
    <td colSpan="4">{getDate(month, year)}</td>
    <td colSpan="2">
      {type === "investmentDone" ? invested_on ? (
        <Link to={`/${invested_on.slug}`}> {invested_on.name_en} </Link>
      ) : (
        "Undisclosed"
      ) : investor ? (
        <Link to={`/${investor.slug}`}> {investor.name_en} </Link>
      ) : (
        "Undisclosed"
      )}
    </td>
    <td colSpan="4">
      {amount ? `$ ${numberWithCommas(amount)}` : "Undisclosed"}
    </td>
  </tr>
);

const InvestmentsDone = ({ investmentsDone = [], slug }) => (
  <table>
    <thead>
      <tr>
        <th colSpan="8">{slug} investment portfolio</th>
      </tr>
      <tr>
        <th colSpan="4">Date</th>
        <th colSpan="2">Invested on</th>
        <th colSpan="4">Amount</th>
      </tr>
    </thead>
    <tbody>
      {investmentsDone.length > 0 ? (
        investmentsDone.map((investment, i) => (
          <InvestmentRow key={i} {...investment} type="investmentDone" />
        ))
      ) : (
        <tr>
          <td colSpan="8">No Records Found</td>
        </tr>
      )}
    </tbody>
  </table>
);

const InvestedOn = ({ investedOn = [], slug }) => (
  <table>
    <thead>
      <tr>
        <th colSpan="8"> Investments received by {slug}</th>
      </tr>
      <tr>
        <th colSpan="4">Date</th>
        <th colSpan="2">Investor</th>
        <th colSpan="4">Amount</th>
      </tr>
    </thead>
    <tbody>
      {investedOn.length > 0 ? (
        investedOn.map((investment, i) => (
          <InvestmentRow key={i} {...investment} type="investedOn" />
        ))
      ) : (
        <tr>
          <td colSpan="8">No Records Found</td>
        </tr>
      )}
    </tbody>
  </table>
);

const InvestmentRecords = ({ investmentsDone, investedOn, slug }) => (
  <div className="investment-records-wrapper">
    <InvestedOn investedOn={investedOn} slug={slug} />
    <InvestmentsDone investmentsDone={investmentsDone} slug={slug} />
  </div>
);

export default InvestmentRecords;
