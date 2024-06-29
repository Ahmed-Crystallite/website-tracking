export const trackEvent = async (event, data) => {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event, data }),
    });
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};
export const trackMouseEvent = (eventName, callback) => {
  document.addEventListener(eventName, (event) => {
    const { clientX, clientY } = event;
    const data = { x: clientX, y: clientY };
    trackEvent(eventName, data);
    if (callback) {
      callback(event);
    }
  });
};

