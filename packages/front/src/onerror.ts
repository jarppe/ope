export const onerror: OnErrorEventHandler = (message, source, lineno, colno, error) => {
  console.error("onerror:", message, source, lineno, colno, error);
  const msg = message.toString()
  return fetch("/api/error", {
    method: "POST",
    body: JSON.stringify({
      message: msg && msg.length > 1024 ? msg.substring(0, 1024) + "..." : msg,
      source,
      lineno,
      colno,
      error
    }),
    credentials: "include",
  });
}


window.onerror = onerror
