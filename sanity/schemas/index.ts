import { type SchemaTypeDefinition } from "sanity";

import Artist from "./artist";
import Expositions from "./exhibition";
import Artwork from "./artwork";
import Serie from "./serie";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Artist, Serie, Artwork, Expositions],
};
