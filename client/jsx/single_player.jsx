const
  PATH = require('../../common/constants').PATH,
  React = require('react'),
  FormattedMessage = require('react-intl').FormattedMessage,
  en_keys = require('../js/nls/en/common').keys,
  singlePlayer = require('../js/game/singleplayer');

var
  game_foreground_canvas, game_foreground_context,
  game_background_canvas, game_background_context;

class SinglePlayer extends React.Component {

  constructor() {
    super();
    // this._handleClick = this._handleClick.bind(this);
  }
 
  componentDidMount() {
    game_foreground_context = game_foreground_canvas.getContext('2d');
    game_background_context = game_background_canvas.getContext('2d');
    singlePlayer.start();
    singlePlayer.play();
  }
  
  componentWillUnmount() {
    game_foreground_context = game_background_context = null;
  }
  
  render() {
    return <div className="canvas-wrapper">
      <canvas ref={node => {
        game_foreground_canvas = node
      }}>
        <FormattedMessage id={en_keys.$CANVAS_NOT_SUPPORTED}/>
      </canvas>
      <canvas ref={node => {
        game_background_canvas = node
      }}>
        <FormattedMessage id={en_keys.$CANVAS_NOT_SUPPORTED}/>
      </canvas>
      Single Player
    </div>
  }
}

module.exports = SinglePlayer;