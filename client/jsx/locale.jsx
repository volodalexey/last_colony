const
  LOCALE = require('../../common/constants').LOCALE,
  React = require('react'),
  connect = require('react-redux').connect,
  ReactIntl = require('react-intl'),
  IntlProvider = ReactIntl.IntlProvider,
  addLocaleData = ReactIntl.addLocaleData,
  en = require('react-intl/locale-data/en'),
  ru = require('react-intl/locale-data/ru'),
  en_messages = require('../js/nls/en/common').messages,
  ru_messages = require('../js/nls/ru/common').messages,
  messages_dic = {
    [LOCALE.EN]: en_messages,
    [LOCALE.RU]: ru_messages,
  };

addLocaleData([...en, ...ru]);

const Locale = (props) => {
  return <IntlProvider locale={props.locale} messages={props.messages}>
      {props.children}
    </IntlProvider>
};

const mapStateToProps = (state) => {
  return {
    locale: state.locale,
    messages: messages_dic[state.locale]
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

const WrappedMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(Locale);

module.exports = WrappedMenu;