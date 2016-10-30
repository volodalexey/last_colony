const
  constants = require('../../common/constants'),
  PATH = constants.PATH,
  LOCALE = constants.LOCALE,
  React = require('react'),
  Link = require('react-router').Link,
  connect = require('react-redux').connect,
  basic_actions = require('../js/actions/basic_actions'),
  FormattedMessage = require('react-intl').FormattedMessage;

const Menu = (props) => {
  return <div>
    <FormattedMessage
      id="welcome"
      values={{name: <b>Bob</b>, unreadCount: 100}}
    />
    <button type="button" onClick={props.handleChangeLocale}>
      Change Locale
    </button>
    <ul>
      <li>
        <Link to={PATH._GAME_SINGLE_PLAYER} >
          Single player
        </Link>
      </li>
    </ul>
  </div>
};

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeLocale: () => {
      dispatch(basic_actions.changeLocale(LOCALE.RU))
    }
  }
};

const WrappedMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

module.exports = WrappedMenu;