module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = (item, id, QTY) =>
    {
        // QTY = parseInt(QTY);
        var storedItem = this.items[id]
        if(!storedItem)
        {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
            storedItem.qty = storedItem.qty + QTY;
            storedItem.price = storedItem.item.Cost * storedItem.qty;
            this.totalQty++;
            this.totalPrice += storedItem.item.Cost* QTY;
        }
        else{
            storedItem.qty = storedItem.qty + QTY;
            storedItem.price = storedItem.item.Cost * storedItem.qty;
            this.totalPrice += storedItem.item.Cost* QTY;
        }

    }

    this.reduceByOne = function(id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.Cost;
        this.totalPrice -= this.items[id].item.Cost;

        if(this.items[id].qty<=0)
        {
            this.totalQty--;
            delete this.items[id];
        }
    };

    this.increaseByOne = function(id){
        this.items[id].qty++;
        this.items[id].price += this.items[id].item.Cost;
        this.totalPrice += this.items[id].item.Cost;
    }

    this.updateQty = function(id, qty){
        const oldQty = this.items[id].qty;
        this.items[id].qty = qty;
        this.items[id].price = this.items[id].item.Cost * qty;

        var distance = qty - oldQty;
        if(distance < 0)
            this.totalPrice -= this.items[id].item.Cost*(Math.abs(distance))
        else
            this.totalPrice += this.items[id].item.Cost*(distance);
    }
    
    this.removeItem = function(id){
        this.totalQty--;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    }

    this.generateArray = () =>{
        var arr =[];
        
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        
        return arr;
    }
}