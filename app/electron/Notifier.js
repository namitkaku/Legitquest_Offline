const { Notification } = require("electron");
function SendNotification(  props) {
  new Notification(
    props /* { title: "File Downloaded", body: "File downloaded successfully completed" } */
  ).show();
}

module.exports = SendNotification;
