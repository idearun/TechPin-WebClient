import React, { PropTypes } from "react";
import { baseUrl } from "../../api/realApi";

import StarRating from "../sharedComponents/StarRating";
import Divider from "material-ui/Divider";
import ContentLink from "material-ui/svg-icons/content/link";
import NoLogoImage from "../../../images/nologo.png";

export default class StartupWidgetMoreInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {
        details: {}
      }
    };
  }

  componentWillMount = () => {
    if (Object.keys(this.props.product).length > 0) {
      this.setState({ product: this.props.product });
    }
  };
  componentWillReceiveProps = nextProps => {
    if (Object.keys(nextProps.product).length > 0) {
      this.setState({ product: nextProps.product });
    }
  };

  render() {
    // worst piece of code i have ever written, ugly and buggy. needs refactor...
    let data = {
      website: this.state.product.website || "...",
      name_en: this.state.product.name_en || "...",
      slug: this.state.product.slug || "",
      average_p_rate: this.state.product.average_p_rate || 0,
      n_p_score: this.state.product.n_p_score || 0,
      description_en: this.state.product.details
        ? this.state.product.details.description_en
        : "",
      city: this.state.product.details ? this.state.product.details.city : "",
      country: this.state.product.details
        ? this.state.product.details.country
        : "",
      year: this.state.product.details
        ? this.state.product.details.year || ""
        : "",
      summary: this.state.product.details
        ? this.state.product.details.summary
        : "",
      logo: this.state.product.details ? this.state.product.details.logo : ""
    };
    if (data.summary.length === 0) {
      data.summary = data.description_en.split(/\s+/, 30).join(" ") + "...";
    }
    return (
      <div className="single-body">
        {data.logo ? (
          <img src={baseUrl + data.logo} width="100px" alt="logo" />
        ) : (
          <img src={NoLogoImage} width="100px" alt="logo" />
        )}
        <div>
          <span>
            <a
              href={data.website}
              target="_blank"
              style={{ display: "inline-flex", alignContent: 'center', alignItems: 'center', color: '#0D47A1' }}
            >
              {data.name_en}
              <ContentLink color="#0D47A1" style={{ marginLeft: 5 }} hoverColor='aqua' />
            </a>
            <span id="single-meta-info">
              {data.city && `${data.city},${data.country}`}
            </span>
          </span>
          {/*<StarRating productId={data.slug} rating={data.average_p_rate} editAble={false} className='star-rating-single' />*/}
          {/*<span className="nps-score">{`N.P.S: ${data.n_p_score}`}</span>*/}
          <span className="single-page-summary">{data.summary}</span>
        </div>
        <Divider />
      </div>
    );
  }
}

StartupWidgetMoreInfo.propTypes = {};
