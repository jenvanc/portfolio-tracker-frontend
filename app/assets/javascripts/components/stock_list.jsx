class StockList extends React.Component{
  constructor(){
    super()
    this.state ={
      portfolioPnl: "",
      user: "",
      portfolioStocks: [],
      pnl: "",
    }
    this.getData = this.getData.bind(this)
  }
  componentDidMount(){
    var that = this
    $.ajax({
        url: 'https://portfolio-tracker-backend.herokuapp.com/users/1/portfolio',
        dataType: "json",
      }).done(function(data){
        that.setState({
          user: data["name"],
          portfolioStocks: data["stocks"],
          pnl: data["portfolio_pnl"],
          portfolioPnl: data["portfolio_pnl"],
        })
      })
      this.newData = setInterval(this.getData, 10000)
  }

  getData(){
    console.log("request sent")
    var that = this
        $.ajax({
            url: 'https://portfolio-tracker-backend.herokuapp.com/users/1/portfolio',
            dataType: "json",
          }).done(function(data){
                console.log("request recieved")
            that.setState({
              user: data["name"],
              portfolioStocks: data["stocks"],
              pnl: data["portfolio_pnl"],
              portfolioPnl: data["portfolio_pnl"],
            })
          })
  }
  render(){
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3 col-md-2 sidebar">
            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <h2 className="sub-header">{this.state.user} Portfolio:</h2>
            <h2 id="portfolio-pnl"> P&L: {this.state.portfolioPnl}</h2>
              <div className="table-div">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Company:</th>
                    <th>Stock Symbol:</th>
                    <th>Shares Owned:</th>
                    <th>Avg. Purchase Price:</th>
                    <th>Current Price:</th>
                    <th>Original Position Value:</th>
                    <th>Current Position Value:</th>
                    <th>P&L:</th>
                  </tr>
                </thead>
                  {this.state.portfolioStocks.map((stock, i) =>
                    <Stock stocks={stock} key={i}/>
                  )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
