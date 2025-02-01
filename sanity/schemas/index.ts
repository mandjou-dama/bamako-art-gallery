import { type SchemaTypeDefinition } from "sanity";

import Artist from "./artist";
import Expositions from "./exhibition";
import Artwork from "./artwork";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Artist, Artwork, Expositions],
};
