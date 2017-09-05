import React, { PropTypes } from "react";
import { Link } from "react-router";
import { baseUrl } from "../../api/realApi";
import LazyLoad from "react-lazy-load";
import StarRating from "../sharedComponents/StarRating";

import { ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";

const styles = {
  logo: {
    width: 85
  },
  container: {
    backgroundColor: "white"
  }
};

const generateShortDesc = desc => {
  if (desc.length === 0) {
    return "No descriptions yet. be the first one to add descriptions to this product !";
  } else {
    let shortDesc = desc
      .split(" ")
      .splice(0, 10)
      .join(" ");
    if (shortDesc.split(" ").length < 10) return shortDesc;
    return `${shortDesc} ...`;
  }
};

const LzLoImage = ({ img }) => (
  <LazyLoad width={85} offsetVertical={50}>
    <img src={img} alt="logo" style={styles.logo} />
  </LazyLoad>
);

const StartUpWidget = ({ product, i }) => {
  const { name_en, average_p_rate, details, slug } = product;

  return (
    <div style={styles.container}>
      <Link to={`${slug}`}>
        <div className="widget">
          <LzLoImage img={baseUrl + details.logo} />
          <div>
            <div className="widget-title">{name_en}</div>
            <div className="widget-text">
              {generateShortDesc(details.description_en)}
            </div>
            <StarRating rating={average_p_rate} />
          </div>
        </div>
        {i < 24 ? <Divider inset={true} /> : ""}
      </Link>
    </div>
  );
};

export default StartUpWidget;
