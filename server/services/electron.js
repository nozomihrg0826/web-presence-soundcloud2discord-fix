const IS_ELECTRON = process.env.ELECTRON_MODE === "true";
const pendingRequests = new Map();
let nextRequestId = 1;

// Sends a message to the Electron main process via IPC.
function sendToElectron(message, delay = 0) {
  if (!IS_ELECTRON) return;

  const send = () => {
    if (typeof process.send !== "function") {
      console.error("[FAIL] CRITICAL: process.send is not available!");
      return;
    }
    try {
      process.send(message);
    } catch (err) {
      console.error(`[FAIL] Failed to send "${message}" signal:`, err.message);
    }
  };

  delay > 0 ? setTimeout(send, delay) : send();
}

const sendReady = () => sendToElectron("ready");
const sendRestart = () => sendToElectron("RESTART_SERVER", 1000);
const sendResetConfig = () => sendToElectron("RESET_CONFIG", 1000);
const sendOpenPath = (folderPath) => sendToElectron({ type: "OPEN_PATH", path: folderPath });

function requestElectron(type, payload = {}, timeoutMs = 5000) {
  if (!IS_ELECTRON || typeof process.send !== "function") {
    return Promise.resolve(null);
  }

  const requestId = nextRequestId++;

  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      pendingRequests.delete(requestId);
      resolve(null);
    }, timeoutMs);

    pendingRequests.set(requestId, (message) => {
      clearTimeout(timeout);
      resolve(message);
    });

    try {
      process.send({ type, requestId, ...payload });
    } catch (err) {
      clearTimeout(timeout);
      pendingRequests.delete(requestId);
      console.error(`[FAIL] Failed to send "${type}" request:`, err.message);
      resolve(null);
    }
  });
}

if (IS_ELECTRON) {
  process.on("message", (message) => {
    const handler = pendingRequests.get(message?.requestId);
    if (!handler) return;
    pendingRequests.delete(message.requestId);
    handler(message);
  });
}

const getAutoStart = async () => {
  const response = await requestElectron("GET_AUTOSTART");
  return Boolean(response?.value);
};

const setAutoStart = async (value) => {
  const response = await requestElectron("SET_AUTOSTART", { value: Boolean(value) });
  return {
    success: response?.success !== false,
    value: Boolean(response?.value),
  };
};

module.exports = { sendReady, sendRestart, sendResetConfig, sendOpenPath, getAutoStart, setAutoStart };
