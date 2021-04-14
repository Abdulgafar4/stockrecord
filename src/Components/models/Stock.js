class Stock {
    constructor(id, index, productname, productcode, categories, instock, price, date){
        this.id = id;
        this.index = index;
        this.productname = productname;
        this.productcode = productcode;
        this.categories =  categories;
        this.instock  = instock;
        this.price = price;
        this.date = date;
    }
}

export default Stock;