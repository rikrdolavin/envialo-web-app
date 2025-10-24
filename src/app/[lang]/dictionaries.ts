import { Locale } from "@/models/language";
import "server-only";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  es: () => import("./dictionaries/es.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale["locale"]) {
  return dictionaries[locale]();
}
