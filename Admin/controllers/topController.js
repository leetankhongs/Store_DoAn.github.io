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
        let category = null;
        if(req.query.Category) {
            category = await categoryService.findCategory(req.query.Category);
            if(!category) {
                res.render('error.hbs', {message: "Error finding category"});
            }
        }
        const dictionary = {};
        let desiredStates = null;
        const allOrdersSatisfied = await orderService.getAllOrders(desiredStates);
        allOrdersSatisfied.forEach( order => {
            const cartItems = order.Cart.items;
            
            for(let x in cartItems)
            {
                const item = cartItems[x];
                const regex = new RegExp(`\\b${item.item.TypeProduct}\\b`, "i");
                if(category && !category.Type.match(regex)) {
                    continue;
                }
                if(dictionary[item.item._id]) dictionary[item.item._id] += item.qty;
                else dictionary[item.item._id] = item.qty;
            };
        });
        
        // Create items array
        let items = Object.keys(dictionary).map(function(key) {
            return [key, dictionary[key]];
        });
        
        // Sort the array
        const min = items.length < maxNumber ? items.length : maxNumber;
        if(items.length < Math.pow(2, min)){
            items.sort((a, b) => parseInt(b[1]) - parseInt(a[1]));
        }else{
            for(let i = 0; i < min; i++) {
                let max = i;
                for(let j = i + 1; j < items.length; j++){
                    if (parseInt(items[j][1]) > parseInt(items[max][1])) {max = j;}
                } 
                [items[i], items[max]] = [items[max], items[i]];
            }
        }
        items = items.slice(0, min);
        
        const categoryDictionary = {};
        //Map each item with corresponding display
        for(let i = 0; i < items.length; i++){
            const productID = items[i][0];
            const product = await productService.findProductByID(productID);
            let productCategory = category;
            if(!category){
                if(!categoryDictionary[product.TypeProduct]){
                    productCategory = await categoryService.findCategory(product.TypeProduct);
                    categoryDictionary[product.TypeProduct] = productCategory;
                }
                else{
                    productCategory = categoryDictionary[product.TypeProduct];
                }
            }
            product.TOP = i + 1;
            product.DisplayNameCategory = productCategory.DisplayName;
            product.TotalSales = items[i][1];
            product.Color = random_rgba(); 
            items[i] = product;
        }

        if(!category){
            res.render('TOP/TopSP.hbs', {topItems: items, pollData: JSON.stringify(items)});
            return;
        }
        console.log(items);
        res.render('TOP/TopGH.hbs', {topItems: items, pollData: JSON.stringify(items), category, pollCategory: JSON.stringify(category)});
        
    })();
}