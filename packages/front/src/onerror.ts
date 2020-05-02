export const error = (body: object) => {
  return fetch("/api/error", {
    method: "POST",
    body: JSON.stringify(body),
  })
}

const onerror: OnErrorEventHandler = (msg, source, lineno, colno, err) => {
  console.error("onerror:", msg, source, lineno, colno, err)
  const m = msg.toString()
  const message = m.length > 1024 ? m.substring(0, 1024) + "..." : m
  return error({
    message,
    source,
    lineno,
    colno,
    err,
  })
}


window.onerror = onerror
