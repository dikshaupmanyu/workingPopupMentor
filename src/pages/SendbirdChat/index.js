import React, { Component } from 'react';
import Sidebar from '../../common/Sidebar';
import axios from 'axios';
import {BASE_URL} from '../../constants/constants';
import { SendBirdAction } from './SendBirdAction';
import { SendBirdConnection } from './SendBirdConnection';
// import { Chat } from './Chat';

const sb = new SendBirdAction();
// const chat = new Chat();

class SendbirdChat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            user: {},
            tokendata: "",
            channelList: []
        }
    }

    componentDidMount() {
      // this._getOpenChannelList(true);
      this._connectSendbird();
    }

    _connectSendbird = () => {
      sb.connect('diksha', 'diksha').then(user => {
        console.log('======================================', user);
        console.log(user);
        this._getOpenChannelList();
      }).catch(() => {
        
      });
    }

    _getOpenChannelList(isInit = false, urlKeyword = '') {
      if (urlKeyword !== this.searchKeyword) {
        this.searchKeyword = urlKeyword;
        isInit = true;
      }
  
      SendBirdAction.getInstance()
        .getOpenChannelList(isInit, urlKeyword)
        .then(openChannelList => {
          console.log("|||||||||||||||", openChannelList[2]);
          SendBirdAction.getInstance()
          .getMessageList(openChannelList[2])
          .then(messageList => {
            console.log('++++++++++++++++messageList++++++++++++++++++', messageList);
          })
          .catch(error => {
            
          });
        })
        .catch(error => {

        });
    }

    goToChannel = channel => {
      console.log('++++++++++++++', channel);
      SendBirdAction.getInstance()
      .getMessageList(channel)
      .then(messageList => {
        console.log('++++++++++++++++messageList++++++++++++++++++', messageList);
      })
      .catch(error => {
        
      });
    }

    render() {
        return (
            <div className="container-fluid" style={{background: "#263b66"}}>  
               <div className="row" style={{background: "#263b66"}}>
                    <div className="col-md-3">
                        <Sidebar history={this.props.history} />
                    </div>
                    <div className="col-md-9 mx-auto">
                      <div class="chat-main-root">
                        <div class="chat-main">
                          <div class="chat-body">
                            <div id={messageId}>

                            </div>
                          </div>
                        </div>
                        {/* {this.state.channelList.length > 0 && this.state.channelList.map((channel, index) => {
                          return(
                            <div id={channel.coverUrl} key={index} class="channel-item" onClick={() => this.goToChannel(channel)}>
                              <div class="item-title">
                                {channel.name}
                              </div>
                              <div class="item-desc">
                                Created on {channel.createdAt}
                              </div>
                            </div>
                          )
                        })} */}
                      </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SendbirdChat;