import type { getDictionary } from "@/server/dictionary";
export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
