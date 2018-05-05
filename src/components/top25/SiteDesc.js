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
          title= {<span className="card-style-title">1200</span>}
          className="card-header-style"
          titleStyle={{ fontSize: '1.6em' }}
          subtitleStyle={{ fontSize: '0.5em', fontWeight: 'normal' }}
          subtitle= {<span className="card-style-subtitle">Startups</span>}
        />
      </Card>

      <Card className="card-style">
        <CardHeader
          title= {<span className="card-style-title">140</span>}
          className="card-header-style"
          titleStyle={{ fontSize: '1.6em' }}
          subtitleStyle={{ fontSize: '0.5em', fontWeight: 'normal' }}
          subtitle= {<span className="card-style-subtitle">Accelerators & VCs</span>}
        />
      </Card>



      <Card className="card-style">
        <CardHeader
          title= {<span className="card-style-title">5.3B</span>}
          className="card-header-style"
          titleStyle={{ fontSize: '1.6em' }}
          subtitleStyle={{ fontSize: '0.5em', fontWeight: 'normal' }}
          subtitle= {<span className="card-style-subtitle">$ Total Fundings</span>}
        />
      </Card>

      <Card className="card-style">
        <CardHeader
          title= {<span className="card-style-title">116</span>}
          className="card-header-style"
          titleStyle={{ fontSize: '1.6em' }}
          subtitleStyle={{ fontSize: '0.5em', fontWeight: 'normal' }}
          subtitle= {<span className="card-style-subtitle">Founding Rounds Announced</span>}
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
        <Table className="news-table">
    <TableHeader displaySelectAll={false} className="news-table-header">
      <TableRow selectable={false} style={{height: 20}}>
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

      {/* <TableBody
          >
            {this.state.data.map((user, i) =>
              <TableRow key={i} value={user}>
                <TableRowColumn>{user.id}</TableRowColumn>
                <TableRowColumn>{user.name}</TableRowColumn>
              </TableRow>
            )}
          </TableBody> */}

  </div>
  </div>
);

export default SiteDesc;
