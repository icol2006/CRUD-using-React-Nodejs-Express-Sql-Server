 
var ProductAll = React.createClass({ 

  getInitialState: function () {
    return { ProductName: '' ,ProductPrice: '',ProductID:'',Buttontxt:'Save', data1: []};
  },
   handleChange: function(e) {
        this.setState({[e.target.name]: e.target.value});
        this.setState({[e.target.name]: e.target.value});
    },

  componentDidMount() {
 
    $.ajax({
       url: "/api/products",
       type: "GET",
       dataType: 'json',
       ContentType: 'application/json',
       success: function(data) {     
        
         this.setState({data1: data}); 
         
       }.bind(this),
       error: function(jqXHR) {
         console.log(jqXHR);
           
       }.bind(this)
    });
  },
  
DeleteData(id){      
    $.ajax({
      url: "/api/products/"+id,
      dataType: 'json',
      type: 'DELETE',
      success: function(data) {
         this.componentDidMount();

      }.bind(this),
      error: function(xhr, status, err) {
         alert(err); 
           
          
      }.bind(this),
      });
    },
 


    EditData(item){         
   this.setState({ProductName: item.ProductName,ProductPrice:item.ProductPrice,ProductID:item.ProductID,Buttontxt:'Update'});
     },

   handleClick: function() {
 
   var Url="";
   var typex="POST";
   if(this.state.Buttontxt=="Save"){
      Url="/api/products";
       }
      else{
        Url="/api/products/"+this.state.ProductID;
        typex="PUT";
      }
      var productdata = {
        'ProductName': this.state.ProductName,
        'ProductPrice':this.state.ProductPrice,
        'ProductID':this.state.ProductID,
        
    }
    $.ajax({
      url: Url,
      dataType: 'json',
      type: typex,
      data: productdata,
      success: function(data) {               
          this.setState(this.getInitialState());
          this.componentDidMount();
         
      }.bind(this),
      error: function(xhr, status, err) {
         alert(err);     
      }.bind(this)
    });
  },

  render: function() {
    return ( 
      <div  className="container"  style={{marginTop:'50px'}}>
       <p className="text-center" style={{fontSize:'25px'}}><b> CRUD Operation Using React,Nodejs,Express,Sql Server</b></p>
  <form>
    <div className="col-sm-12 col-md-12"  style={{marginLeft:'400px'}}> 
  <table className="table-bordered">
     <tbody>
    <tr>
      <td><b>Product Name</b></td>
      <td>
         <input className="form-control" type="text" value={this.state.ProductName}    name="ProductName" onChange={ this.handleChange } />
          <input type="hidden" value={this.state.ProductID}    name="ProductID"  />
      </td>
    </tr>

    <tr>
      <td><b>Product Price</b></td>
      <td>
      <input type="text" className="form-control" value={this.state.ProductPrice}  name="ProductPrice" onChange={ this.handleChange } />
      </td>
    </tr>

    <tr>
      <td></td>
      <td>
        <input className="btn btn-primary" type="button" value={this.state.Buttontxt} onClick={this.handleClick} />
      </td>
    </tr>

 </tbody>
    </table>
</div>
 

<div className="col-sm-12 col-md-12 "  style={{marginTop:'50px'}} >
 
 <table className="table"><tbody>
   <tr><th><b>id</b></th><th><b>Price</b></th><th><b>Name</b></th><th><b>Edit</b></th><th><b>Delete</b></th></tr>
    {this.state.data1.map((item, index) => (
        <tr key={index}>
           <td>{item.ProductID}</td> 
          <td>{item.ProductPrice}</td>                      
          <td>{item.ProductName}</td>
           <td> 
          
           <button type="button" className="btn btn-success" onClick={(e) => {this.EditData(item)}}>Edit</button>    
          </td> 
          <td> 
             <button type="button" className="btn btn-info" onClick={(e) => {this.DeleteData(item.ProductID)}}>Delete</button>
          </td> 
        </tr>
    ))}
    </tbody>
    </table>
     </div>
</form>        
      </div>
    );
  }
});

ReactDOM.render(<ProductAll  />, document.getElementById('root'))