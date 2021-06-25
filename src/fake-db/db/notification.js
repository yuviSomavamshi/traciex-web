import Mock from "../mock";
import shortId from "shortid";

const NotificationDB = {
  list: [
    {
      id: shortId.generate(),
      heading: "Message",
      icon: {
        name: "chat",
        color: "primary"
      },
      timestamp: Date.now(),
      title: "New message from Devid",
      subtitle: "Hello, Let's chit chat...",
      path: "chat"
    },
    {
      id: shortId.generate(),
      heading: "Alert",
      icon: {
        name: "notifications",
        color: "error"
      },
      timestamp: Date.now(),
      title: "Server overloaded",
      subtitle: "Traffice reached 2M",
      path: "dashboard"
    }
  ]
};

Mock.onGet("/api/notification").reply((config) => {
  const response = NotificationDB.list;
  return [200, response];
});

Mock.onPost("/api/notification/add").reply((config) => {
  const response = NotificationDB.list;
  return [200, response];
});

Mock.onPost("/api/notification/delete").reply((config) => {
  let { id } = JSON.parse(config.data);

  const response = NotificationDB.list.filter((notification) => notification.id !== id);
  NotificationDB.list = [...response];
  return [200, response];
});

Mock.onPost("/api/notification/delete-all").reply((config) => {
  NotificationDB.list = [];
  const response = NotificationDB.list;
  return [200, response];
});
