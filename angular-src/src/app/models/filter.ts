interface IFacet {
    name: string;
    checked: boolean;
}

interface IParams {
    title: string;
    values?: Array<IFacet>;
    type?: string;
    minValue?: string;
    maxValue?: string;
}

 interface IFilter {
     category: string;
     params: Array<IParams>;
     brands: Array<IFacet>;
     minPrice: string;
     maxPrice: string;
 }

export class Filter implements IFilter {
    public category: string;
    public params: Array<IParams>;
    public brands: Array<IFacet>;
    public minPrice: string;
    public maxPrice: string;
}
