import './Notification.css';

const Notification = ({ message, styles }) => {
  if (!message) {
    return null;
  }

  return <div className={styles}>{message}</div>;
};

export default Notification;
