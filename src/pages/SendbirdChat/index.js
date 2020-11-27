import React, { Component } from 'react';
import Sidebar from '../../common/Sidebar';
import axios from 'axios';
import {BASE_URL} from '../../constants/constants';
import { SendBirdAction } from './SendBirdAction';
import { SendBirdConnection } from './SendBirdConnection';
import { timestampToTime } from './utils';
// import { Chat } from './Chat';

const screenHeight = window.innerHeight;

const sb = new SendBirdAction();
// const chat = new Chat();

class SendbirdChat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            user: {},
            tokendata: "",
            channelList: [],
            messageList: [],
            storageData: {},
        }
    }

    componentDidMount() {
      // this._getOpenChannelList(true);
      const sData = localStorage.getItem('allTokenData');
      if (sData !== null) {
        this.setState({
            storageData: JSON.parse(sData),
        }, () => {
          console.log('+++++++++++++++++++++++++++++++++', this.state.storageData.tokendata);
          this._connectSendbird();
        })
      }
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
          .then(msgList => {
            console.log('++++++++++++++++msgList++++++++++++++++++', msgList);
            this.setState({
              messageList: msgList
            })
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
            <div className="container-fluid">  
               <div className="row">
                    <div className="col-md-2">
                        <Sidebar history={this.props.history} />
                    </div>
                    <div className="col-md-9 mx-auto">
                      <div class="chat-main-root" style={{border: '0.5px solid #898989'}}>
                        <div class="chat-main">
                          <div class="chat-body" style={{height: `${screenHeight * 1.99}px`}}>
                            {this.state.messageList.length > 0 && this.state.messageList.map((message, key) => {
                              return (
                                <div id={message.messageId} class="chat-message" data-req-id={message.messageId}>
                                  <div class="message-content">
                                    <div class="message-nickname">
                                      { message._sender.nickname} : 
                                    </div>
                                    {message.name &&
                                      <div class="message-content is-file">
                                        { message.name}
                                      </div>
                                    }
                                    {message.message &&
                                      <div class="message-content">
                                        {` ${message.message}`}
                                      </div>
                                    }
                                    <div class="time">
                                      {timestampToTime(message.createdAt)}
                                    </div>
                                    {message.plainUrl &&
                                      <div class="image-content">
                                        <img class="image-render" src={`${message.plainUrl}?auth=e8BC7PM8Mrl5As6JnnVv9ARgw4cL8MxhAKcwfkMx0zqDNvm4EOEXVhEJ11LDpgK-uXs1ppYINc4Dn0ZXfuUBCg`} />
                                      </div>
                                    }
                                  </div>
                                </div>
                              )
                            })}
                          </div>

                          <div class="chat-input">
                            <div class="typing-field"></div>
                            <label class="input-file">
                              <input type="file" id="attach_file_id" style={{display : "none"}}/>
                            </label>
                            <div class="input-text">
                              <textarea class="input-text-area" placeholder="Write a chat..."></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SendbirdChat;