import{ connect } from 'react-redux';
import PreferenceOne from './preference_one';

const mapStateToProps = ({ user }) => ({

});

const mapDispatchToProps = dispatch => ({
  unauthUser: () => dispatch(unauthUser),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preference);
