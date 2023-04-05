import Header from "common/Header";
import Notification from "common/Notification";
import GatewayDetails from "features/gateways/components/GatewayDetails";
import GatewayList from "features/gateways/components/GatewayList";
import { Navigate, Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.appWrapper}>
        <Routes>
          <Route path="/" element={<Navigate to="/gateways" replace />} />
          <Route path="/gateways" element={<GatewayList />} />
          <Route path="/gateways/:id" element={<GatewayDetails />} />
          <Route path="*" element={<Navigate to="/gateways" replace />} />
        </Routes>
      </div>

      <Notification />
    </div>
  );
}

export default App;
