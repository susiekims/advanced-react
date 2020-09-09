import Reset from "../components/Reset";

const ResetPage = (props) => (
  <div>
    <p>Reset your passwords</p>
    <Reset resetToken={props.query.resetToken} />
  </div>
);

export default ResetPage;
