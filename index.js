import crypto from "crypto";

export const GenerateSmartPassLink = (fields, distributionURL, key) => {
  const newKey = Buffer.from(key, "hex");
  const iv = Buffer.from(crypto.randomBytes(16), "base64");
  const cipher = crypto.createCipheriv("aes-256-cbc", newKey, iv);
  cipher.write(JSON.stringify(fields));
  cipher.end();

  const encrypted = cipher.read().toString("base64");
  return `${distributionURL}?data=${encrypted}&iv=${iv.toString("base64")}`;
};
