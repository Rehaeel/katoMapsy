import ReactDOM from 'react-dom';
const portalEl = document.getElementById('portal');

const Portal = (props) => ReactDOM.createPortal(props.children, portalEl);

export default Portal;
