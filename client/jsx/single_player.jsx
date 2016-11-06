const
  PATH = require('../../common/constants').PATH,
  React = require('react'),
  FormattedMessage = require('react-intl').FormattedMessage,
  en_keys = require('../js/nls/en/common').keys;

// const engine = require('../js/game/engine');

class SinglePlayer extends React.Component {

  constructor() {
    super();
    // this._handleClick = this._handleClick.bind(this);
  }
 
  componentDidMount() {
    // engine.init();
    // context = canvas.getContext('2d');
  }
  
  componentWillUnmount() {
    
  }
  
  render() {
    return <div className="canvas-wrapper">
      <canvas ref={node => {
        this.game_foreground_canvas = node
      }}>
        <FormattedMessage id={en_keys.$CANVAS_NOT_SUPPORTED}/>
      </canvas>
      <canvas ref={node => {
        this.game_background_canvas = node
      }}>
        <FormattedMessage id={en_keys.$CANVAS_NOT_SUPPORTED}/>
      </canvas>
      Single Player
    </div>
  }
}

module.exports = SinglePlayer;