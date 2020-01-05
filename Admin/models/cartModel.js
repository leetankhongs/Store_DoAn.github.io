module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;


    this.generateArray = () =>{
        var arr =[];
        
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        
        return arr;
    }
}