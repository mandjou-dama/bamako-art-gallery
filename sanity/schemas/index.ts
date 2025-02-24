import { type SchemaTypeDefinition } from "sanity";

import Artist from "./artist";
import Expositions from "./exhibition";
import Artwork from "./artwork";
import Serie from "./serie";
import Bag from "./bag";
import Viewing from "./viewing";
import News from "./news";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Bag, Artist, Artwork, Serie, Expositions, Viewing, News],
};
