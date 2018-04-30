import React from "react";
import Logo from "../../../images/techpin-logo.svg";
import RaisedButton from "material-ui/RaisedButton";
import {Card, CardHeader, CardText} from 'material-ui/Card';
// import scrollTo from "../../helpers/scroll";
import scrollToComponent from "react-scroll-to-component";

//Adds Table
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const scrollToDueDiligence = () => {
  scrollToComponent(document.getElementById("contact-form"), {
    align: "top",
    duration: 1500
  });
};

const SiteDesc = ({ openAddProductModal }) => (
  <div className="site-desc">
      <h1>Dynamic list of startups and accelerators in Iran</h1>
      <p>Discover the best new startups and products.</p>
      <div className="action-buttons-container">
        <RaisedButton
          onClick={openAddProductModal}
          backgroundColor="#0d47a1"
          labelColor="white"
          style={{ marginRight: 20 }}
          labelStyle={{ top: -3 }}
          label="add new product or company"
        />
        <RaisedButton
          onClick={scrollToDueDiligence}
          labelStyle={{ top: -3 }}
          backgroundColor="black
          "
          labelColor="white"
          label="Due Diligence service"
        />
      </div>
      <div className="stat-cards">
      <Card className="card-style">
        <CardHeader
          title="1200"
          className="card-header-style"
          titleStyle={{ fontSize: '1.6em' }}
          subtitleStyle={{ fontSize: '0.5em', fontWeight: 'normal' }}
          subtitle="Startups"
          titleColor="#0d47a1"
          subtitleColor="#212121"
        />
      </Card>
      <Card className="card-style">
        <CardHeader
          title="140"
          className="card-header-style"
          titleStyle={{ fontSize: '1.6em' }}
          subtitleStyle={{ fontSize: '0.5em', fontWeight: 'normal' }}
          subtitle="Accelerators & VCs"
          titleColor="#0d47a1"
          subtitleColor="#212121"
        />
      </Card>
      <Card className="card-style">
        <CardHeader
          title="5.3B"
          className="card-header-style"
          titleStyle={{ fontSize: '1.6em' }}
          subtitleStyle={{ fontSize: '0.5em', fontWeight: 'normal' }}
          subtitle="$ Total Fundings"
          titleColor="#0d47a1"
          subtitleColor="#212121"
        />
      </Card>
      <Card className="card-style">
        <CardHeader
          title="116"
          className="card-header-style"
          titleStyle={{ fontSize: '1.6em' }}
          subtitleStyle={{ fontSize: '0.5em', fontWeight: 'normal' }}
          subtitle="Founding Rounds Announced"
          titleColor="#0d47a1"
          subtitleColor="#212121"
        />
      </Card>
      </div>
      <div className="news-row">
      <Card className="news-card">
        <CardHeader
          title="NEWS FROM AROUND THE WORLD"
          className="card-header-style"
          titleStyle={{ fontSize: '0.7em', textAlign:'left' }}
          style={{backgroundColor: '#F6F7F9'}}
          titleColor="#212121"
        />
        <CardText>
        <Table>
    <TableHeader displaySelectAll={false}>
      <TableRow>
        <TableHeaderColumn>SOURCE</TableHeaderColumn>
        <TableHeaderColumn>TITLE</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      <TableRow>
        <TableRowColumn>COMING SOON</TableRowColumn>
        <TableRowColumn>-</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
        </CardText>  
      </Card>

      <Card className="news-card">
        <CardHeader
          title="NEWS FROM IRANIAN SOURCES"
          className="card-header-style"
          titleStyle={{ fontSize: '0.7em', textAlign:'left' }}
          style={{backgroundColor: '#F6F7F9'}}
          titleColor="#212121"
        />
        <CardText>
        <Table>
    <TableHeader displaySelectAll={false}>
      <TableRow>
        <TableHeaderColumn>SOURCE</TableHeaderColumn>
        <TableHeaderColumn>TITLE</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      <TableRow>
        <TableRowColumn>COMING SOON</TableRowColumn>
        <TableRowColumn>-</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
        </CardText>  
      </Card>

  </div>
  </div>
);

export default SiteDesc;
