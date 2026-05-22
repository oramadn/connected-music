import { InferSelectModel } from "drizzle-orm";
import { songs } from "src/db/schema";

export type Song = InferSelectModel<typeof songs>;
