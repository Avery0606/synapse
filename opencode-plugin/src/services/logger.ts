type LogLevel = "info" | "warn" | "error" | "debug";

interface LogContext {
  [key: string]: unknown;
}

function formatMessage(level: LogLevel, message: string, context?: LogContext): string {
  const timestamp = new Date().toISOString();
  const contextStr = context ? ` ${JSON.stringify(context)}` : "";
  return `[mem0][${level.toUpperCase()}] ${message}${contextStr}`;
}

export function log(message: string, context?: LogContext): void {
  console.log(formatMessage("info", message, context));
}

export function logError(message: string, context?: LogContext): void {
  console.error(formatMessage("error", message, context));
}

export function logWarn(message: string, context?: LogContext): void {
  console.warn(formatMessage("warn", message, context));
}

export function logDebug(message: string, context?: LogContext): void {
  if (process.env.DEBUG) {
    console.log(formatMessage("debug", message, context));
  }
}
