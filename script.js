document.addEventListener("DOMContentLoaded", () => {
  const chatbotBtn = document.getElementById("chatbot-btn");
  const chatbotWindow = document.getElementById("chatbot-window");
  const resizeHandle = document.getElementById("resize-handle");
  const dragHandle = document.getElementById("drag-handle");
  const openLink = document.getElementById("open-google");

  let iframeLoaded = false;

  // Toggle visibility & inject iframe
  chatbotBtn.addEventListener("click", () => {
    const isHidden = chatbotWindow.style.display === "none";
    chatbotWindow.style.display = isHidden ? "block" : "none";

    if (isHidden && !iframeLoaded) {
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.google.com";
      iframe.frameBorder = "0";
      iframe.style.width = "100%";
      iframe.style.height = "calc(100% - 70px)";
      iframe.id = "help-frame";
      chatbotWindow.insertBefore(iframe, openLink);
      iframeLoaded = true;
    }
  });

  // Open link in new tab
  openLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.open("https://www.google.com", "_blank");
  });

  // === Resizing ===
  let isResizing = false;
  let startX, startY, startWidth, startHeight, startLeft, startTop;

  resizeHandle.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isResizing = true;

    const rect = chatbotWindow.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    startWidth = rect.width;
    startHeight = rect.height;
    startLeft = rect.left;
    startTop = rect.top;

    document.body.style.userSelect = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (isResizing) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      const newWidth = startWidth - dx;
      const newHeight = startHeight - dy;
      const newLeft = startLeft + dx;
      const newTop = startTop + dy;

      const minWidth = 200;
      const minHeight = 200;

      if (newWidth >= minWidth) {
        chatbotWindow.style.width = `${newWidth}px`;
        chatbotWindow.style.left = `${newLeft}px`;
      }

      if (newHeight >= minHeight) {
        chatbotWindow.style.height = `${newHeight}px`;
        chatbotWindow.style.top = `${newTop}px`;
      }
    }
  });

  document.addEventListener("mouseup", () => {
    isResizing = false;
    isDragging = false;
    document.body.style.userSelect = "auto";
  });

  // === Dragging ===
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  dragHandle.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDragging = true;

    const rect = chatbotWindow.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;

    document.body.style.userSelect = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      chatbotWindow.style.left = `${e.clientX - dragOffsetX}px`;
      chatbotWindow.style.top = `${e.clientY - dragOffsetY}px`;
    }
  });
});
