import React from "react";
import { Link } from "react-router";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const InvestmentRow = ({
  amount,
  invested_on = {},
  investor = {},
  link,
  month,
  text,
  year
}) => (
  <li className="investment-row">
    <span>{`${numberWithCommas(amount)} $ Investment From `}</span>
    <Link to={`/${investor.slug}`}> {investor.name_en} </Link>
    <span> On </span>
    <Link to={`/${invested_on.slug}`}> {invested_on.name_en} </Link>
    <span>{`, ${month}/${year}`}</span>
  </li>
);

export default InvestmentRow;
