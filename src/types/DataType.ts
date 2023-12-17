type DataType = ColorJSONType | SandblastJSONType;

type ColorJSONType = {
  RAL: string;
  HTML: string;
  RGB: string;
};

type SandblastJSONType = {
  id: string;
  nameSandblast: string;
  priceSandblast: number;
};
type SupportsType = {
  name: string;
  text: string;
  price: number;
  id: string;
  initialPriceCount: number;
};

type ReadOnlySupportsType = readonly SupportsType[];
