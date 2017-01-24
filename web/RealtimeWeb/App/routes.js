import React from "react";
import  {Route, IndexRoute} from "react-router";
import { App } from './components/App';
import { TwitterFeedPage } from './components/twitter/TwitterFeedPage';
import { ChatPage } from './components/chat/ChatPage';

import 'toastr/build/toastr.min.css';

export default (
     <Route path="/" component={App}>
          <IndexRoute component={TwitterFeedPage} />     
          <Route path="twitterfeed" component={TwitterFeedPage}/>          
          <Route path="chat" component={ChatPage}/>
    </Route>
);