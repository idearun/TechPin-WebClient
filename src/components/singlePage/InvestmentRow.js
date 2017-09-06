import React from "react";
import { Link } from "react-router";
import LinkIcon from "material-ui/svg-icons/content/link";

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
    <span>{numberWithCommas(amount)}</span>
    <span> $ </span>
    {link ? (
      <Link to={link} target="_blank">
        {" "}
        Investment{" "}
      </Link>
    ) : (
      <span> Investment </span>
    )}
    <span> From </span>
    <Link to={`/${investor.slug}`}> {investor.name_en} </Link>
    <span> On </span>
    <Link to={`/${invested_on.slug}`}> {invested_on.name_en} </Link>
    <span>{`, ${month}/${year}`}</span>
  </li>
);

export default InvestmentRow;
