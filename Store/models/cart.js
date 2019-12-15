module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = (item, id, qty) =>
    {
        qty = parseInt(qty);
        var storedItem = this.items[id]
        if(!storedItem)
        {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
            storedItem.qty = storedItem.qty + qty;
            storedItem.price = storedItem.item.Cost * storedItem.qty;
            this.totalQty++;
            this.totalPrice += storedItem.item.Cost;
        }
        else{
            storedItem.qty = storedItem.qty + qty;
            storedItem.price = storedItem.item.Cost * storedItem.qty;
            this.totalPrice += storedItem.item.Cost;
        }

    }

    this.generateArray = () =>{
        var arr =[];
        
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        
        return arr;
    }
}