interface displayNotificationProps {
  text: string;
  type: "success" | "error" | "info";
  duration?: number;
}

const displayNotification = (options: displayNotificationProps) => {
  const container = document.querySelector("#notification-container");
  const notification = document.createElement("div");

  notification.classList.add("notification", options.type);
  notification.innerHTML = `
    <div class="loading">
      <div class="bar"></div>
    </div>
    <div class="icon"></div>
    <p class="text">${options.text}</p>
  `;
  notification.onanimationend = (e) => {
    if (e.animationName === "loading-bar-progress") {
      notification.classList.add("hide");
    } else if (e.animationName === "hide-notification") {
      notification.remove();
    }
  };

  const loadingBar = notification.querySelector<HTMLElement>(".loading .bar");

  if (loadingBar) {
    loadingBar.style.animationDuration = `${options.duration ?? 5}s`;
  }

  if (container) {
    container.appendChild(notification);
  } else {
    const container = document.createElement("div");
    container.id = "notification-container";
    container.appendChild(notification);
    document.body.appendChild(container);
  }
};

export default displayNotification;
