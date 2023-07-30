export const newNotification = (message, styles, setNotificationMessage, setNotificationStyles) => {
  setNotificationMessage(message);
  setNotificationStyles(styles);
  setTimeout(() => {
    setNotificationMessage(null);
    setNotificationStyles(null);
  }, 3000)
}