import React from "react";
import Logo from "../../../images/techpin-logo.svg";
import RaisedButton from "material-ui/RaisedButton";
import {Card, CardHeader, CardText} from 'material-ui/Card';
// import scrollTo from "../../helpers/scroll";
import scrollToComponent from "react-scroll-to-component";
import { withStyles } from 'material-ui/styles';

// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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

const data = [{
  source: "-",
  title: "Coming Soon",
}]


const columns = [{
  Header: 'Source',
  accessor: 'source' // String-based value accessors!
}, {
  Header: 'Title',
  accessor: 'title',
  Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
}]

const SiteDesc = ({ openAddProductModal }) => (
  <div className="site-desc">
      <div className="top-information">
        <h1>Dynamic list of startups and accelerators in Iran</h1>
        <p>Discover the best new startups and products.</p>
        <div className="action-buttons-container">
          <RaisedButton
            onClick={openAddProductModal}
            backgroundColor="#0d47a1"
            labelColor="white"
            style={{ width:'50%'}}
            labelStyle={{ top: -3,fontSize:11 }}
            label="add new product or company"
          />
          <RaisedButton
            onClick={scrollToDueDiligence}
            labelStyle={{ top: -3 }}
            backgroundColor="black"
            style={{ width:'45%', textAlign:'center', marginLeft:'5%' }}
            labelColor="white"
            label="Due Diligence service"
          />
        </div>
      </div>
      
      <div className="stat-cards">
      <Card className="card-style">
        <CardHeader
          title= {<span className="card-style-title">1200</span>}
          className="card-header-style"
          titleStyle={{ fontSize: '2.2em', fontWeight: 700, padding: '20px 0 10px 0' }}
          subtitleStyle={{ fontSize: '0.65em', fontWeight: 'normal' }}
          subtitle= {<span className="card-style-subtitle">Startups</span>}
        />
      </Card>

      <Card className="card-style">
        <CardHeader
          title= {<span className="card-style-title">140</span>}
          className="card-header-style"
          titleStyle={{ fontSize: '2.2em', fontWeight: 700, padding: '20px 0 10px 0' }}
          subtitleStyle={{ fontSize: '0.65em', fontWeight: 'normal' }}
          subtitle= {<span className="card-style-subtitle">Accelerators & VCs</span>}
        />
      </Card>



      <Card className="card-style">
        <CardHeader
          title= {<span className="card-style-title">5.3B</span>}
          className="card-header-style"
          titleStyle={{ fontSize: '2.2em', fontWeight: 700, padding: '20px 0 10px 0' }}
          subtitleStyle={{ fontSize: '0.65em', fontWeight: 'normal' }}
          subtitle= {<span className="card-style-subtitle">$ Total Fundings</span>}
        />
      </Card>

      <Card className="card-style">
        <CardHeader
          title= {<span className="card-style-title">146</span>}
          className="card-header-style"
          titleStyle={{ fontSize: '2.2em', fontWeight: 700, padding: '20px 0 10px 0' }}
          subtitleStyle={{ fontSize: '0.6em', fontWeight: 'normal' }}
          subtitle= {<span className="card-style-subtitle">Funding Rounds Announced</span>}
        />
      </Card>

      </div>
      <div className="news-row">
      <Card className="news-card">
        <CardHeader
          title="NEWS FROM AROUND THE WORLD"
          className="card-header-style"
          titleStyle={{ fontSize: '0.7em', textAlign:'left',fontWeight: 'bold' }}
          style={{backgroundColor: '#F6F7F9'}}
          titleColor="#212121"
        />
        <CardText style={{padding: 0}}>
          <ReactTable
              style={{height: "auto"}}
              data={data}
              columns={columns}
              showPagination={false}
              sortable={false}
              defaultPageSize={5}
            />
        </CardText>  
      </Card>

      <Card className="news-card">
        <CardHeader
          title="NEWS FROM IRANIAN SOURCES"
          className="card-header-style"
          titleStyle={{ fontSize: '0.7em', textAlign:'left', fontWeight: 'bold' }}
          style={{backgroundColor: '#F6F7F9'}}
          titleColor="#212121"
        />
        <CardText style={{padding: 0}}>
          <ReactTable
            style={{height: "auto"}}
            data={data}
            columns={columns}
            showPagination={false}
            sortable={false}
            defaultPageSize={4}
          />
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
