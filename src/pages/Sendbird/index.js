import React, { Component } from 'react';
import Sidebar from '../../common/Sidebar';
//import { StreamChat } from 'stream-chat';
//import { Chat, Channel, ChannelList, Window } from 'stream-chat-react';
//import { ChannelHeader, MessageList } from 'stream-chat-react';
//import { MessageInput, Thread } from 'stream-chat-react';
//import { AnyResource, AnyRole, Allow, Deny} from 'stream-chat';
import 'stream-chat-react/dist/css/index.css';

//const chatClient = new StreamChat('g8yfg5w2yd32');
const storageData = localStorage.getItem('allTokenData');
const parsedStorageDatas = JSON.parse(storageData);
var usernamed = parsedStorageDatas.uname;
//alert(usernamed);


class Sendbird extends Component {
  constructor() {
  super()

  this.state = {
    userid : "",

   };
}
    


componentDidMount() {

const userids = usernamed;
//alert(id)
this.setState({userid:userids})
}


 render() {


    return (
       <div className="container-fluid" style={{background: "#263b66" , color : "#fff"}}>  
          <div className="row" style={{background: "#263b66"}}>
            <div className="col-md-3">
              <Sidebar history={this.props.history} />
            </div>
            <div className="row" style={{marginTop : "20px" , overflow : "hidden"}}>

               <iframe width="1000" height="600" src={`http://ec2-3-84-99-99.compute-1.amazonaws.com:9000/chat.html?userid=${this.state.userid}&nickname=${this.state.userid}`} id="my-iframe" scrolling="yes"></iframe>

            </div>
          </div>
       </div>
    )
  }
}

export default Sendbird  