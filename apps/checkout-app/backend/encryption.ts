import { isSsr, serverEnvVars } from "@/constants";
import { Encrypted } from "@/types/api";
import CryptoJS from "crypto-js";

export const encryptSetting = (settingValue: string): Encrypted<string> => ({
  encrypted:
    CryptoJS.AES.encrypt(
      settingValue,
      serverEnvVars.settingsEncryptionSecret
    ).toString() || "",
});

export const decryptSetting = (settingValue: Encrypted<string>) =>
  isSsr
    ? CryptoJS.AES.decrypt(
        settingValue.encrypted,
        serverEnvVars.settingsEncryptionSecret
      ).toString() || ""
    : "";
