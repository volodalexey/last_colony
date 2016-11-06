const
  constants = require('../../common/constants'),
  PATH = constants.PATH,
  LOCALE = constants.LOCALE,
  React = require('react'),
  Link = require('react-router').Link,
  connect = require('react-redux').connect,
  basic_actions = require('../js/actions/basic_actions'),
  FormattedMessage = require('react-intl').FormattedMessage,
  en_keys = require('../js/nls/en/common').keys;

const Menu = (props) => {
  return <div>
    <FormattedMessage
      id={en_keys.$WELCOME}
      values={{name: <b>Bob</b>, unreadCount: 100}}
    />
    <button type="button" onClick={props.handleChangeLocale}>
      <FormattedMessage id={en_keys.$CHANGE_LOCALE}/>
    </button>
    <ul>
      <li>
        <Link to={PATH._GAME_SINGLE_PLAYER} >
          <FormattedMessage id={en_keys.$SINGLE_PLAYER}/>
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