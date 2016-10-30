const
  PATH = require('../../common/constants').PATH,
  Link = require('react-router').Link,
  React = require('react');

const Menu = (props) => {
  return <div>
    Menu
    <ul>
      <li>
        <Link to={PATH._GAME_SINGLE_PLAYER} >
          Single player
        </Link>
      </li>
    </ul>
  </div>
};

module.exports = Menu;