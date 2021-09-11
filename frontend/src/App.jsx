import { Fragment } from "react";
import { Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ToastConfig from "./configs/toast.config";
import history from "./history";
import renderRoute from './route';



const App = () => {
  // useOnScroll();
  return (
    <Fragment>
      <Router history={history}>
        {renderRoute()}
      </Router>

      {/* init toast */}
      <ToastContainer {...ToastConfig} />
    </Fragment>
  );
}

export default App;
