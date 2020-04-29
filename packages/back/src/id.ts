import { randomBytes } from "crypto"


const generateIdPart = (): string => {
  return Math.floor(Math.random() * 10000).toString().padStart(4, "0")
}

export const generateId = (): string => {
  return generateIdPart() + "-" + generateIdPart() + "-" + generateIdPart()
}


export const generateKey = (): Promise<string> => {
  return new Promise<string>(resolve => randomBytes(16, (err, buffer) => resolve(buffer.toString("hex"))))
}
