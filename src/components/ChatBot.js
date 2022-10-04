import React, { Component } from 'react'

export class ChatBot extends Component {
    componentDidMount() {

        (function (d, m) {
            var kommunicateSettings =
                { "appId": "1b9b2d086e4d04978e006c5856eb866bf", "popupWidget": true, "automaticChatOpenOnNavigation": false };
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
    }
    render() {
        return (
            <></>
        )
    }
}

export default ChatBot