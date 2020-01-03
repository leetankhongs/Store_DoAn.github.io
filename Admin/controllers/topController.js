const orderService = require('../services/orderService');
const productService = require("../services/productService");
const categoryService = require('../services/categoryService');

const maxNumber = 10;
random_rgba = () => {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

module.exports.topProducts = (req, res, next) => {
    (async() => {
        const dictionary = {};
        let desiredStates = [1,2];
        const allOrdersSatisfied = await orderService.getAllOrders(desiredStates);
        allOrdersSatisfied.forEach( order => {
            const cartItems = order.Cart.items;
            
            for(let x in cartItems)
            {
                const item = cartItems[x];
                if(dictionary[item.item._id]) dictionary[item.item._id] += item.qty * item.price;
                else dictionary[item.item._id] = item.qty * item.price;
            };
        });
        
        // Create items array
        let items = Object.keys(dictionary).map(function(key) {
            return [key, dictionary[key]];
        });
        
         // Sort the array
        const min = items.length < maxNumber ? items.length : maxNumber;
        for(let i = 0; i < min; i++) {
            let max = i;
            for(let j = i + 1; j < items.length; j++){
                if (items[j][1] > items[max][1]) max = j;
            } 
            [items[i], items[max]] = [items[max], items[i]];
        }
        items = items.slice(0, min);
        
        //Map each item with corresponding display
        for(let i = 0; i < items.length; i++){
            const productID = items[i][0];
            const product = await productService.findProductByID(productID);
            const category = await categoryService.findCategory(product.TypeProduct);
            product.TOP = i + 1;
            product.DisplayNameCategory = category.DisplayName;
            product.TotalSales = items[i][1];
            product.Color = random_rgba(); 
            items[i] = product;
        }

        res.render('TOP/TopSP.hbs', {topItems: items, pollData: JSON.stringify(items)})
        
    })();
}