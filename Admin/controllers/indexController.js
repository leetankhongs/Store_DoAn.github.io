
const productService = require('../services/productService');
const orderService = require('../services/orderService');
const Cart = require('../models/cartModel');
const categoriesService = require('../services/categoryService');

random_rgba = () => {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

module.exports.index = async (req, res, next) =>{
    const orders = await orderService.getOrdersToday();
    
    const date = new Date(Date.now());
  
    const categories = await categoriesService.getAllCategories();
  
    var listBrand = [];
    var statisticals =[];
    var colors = [];
    for(var i = 0; i < categories.length; i++)
    {
      const brands = await categoriesService.findListBrandOfCategory(categories[i].Type);
      for(var j = 0; j < brands.length; j++)
      {
        listBrand.push(brands[j]);
        statisticals.push(Number(0));
        colors.push(random_rgba());
      }
    }
  
    var totalMoney = 0;
    const countOrder = orders.length;
  
    for(var i = 0; i < orders.length; i++)
    {
      const cart = new Cart(orders[i].Cart);
      const arr = await cart.generateArray();
  
      for(var j =0 ; j < arr.length; j++)
      {
        for(var k = 0; k < listBrand.length; k++)
        {
          if(listBrand[k] === arr[j].item.Brand)
          {
            statisticals[k] += Number(arr[j].price);
            totalMoney += Number(arr[j].price);
            break;
          }
        }
      }
    }
    const text = "THỐNG KÊ DOANH SỐ NGÀY HÔM NAY ( " + date.getDate() + " / " + (date.getMonth()+1) + " / " + date.getFullYear() + " )";

    res.render('index', { totalMoney, countOrder, lable: JSON.stringify(listBrand), data: JSON.stringify(statisticals), color: JSON.stringify(colors), text: JSON.stringify(text) });
  }

module.exports.statistical = async (req, res, next) => {
    const date =  new Date(Date.now());
    var products = [];
    const allProduct = await productService.getAllProduct();
    const allOrder = await orderService.getAllSucessOrder();

    for (var i = 0; i < allProduct.length; i++) {
        products.push({
            product: allProduct[i],
            qty: Number(0),
            total: Number(0)
        });
    }

    for (var i = 0; i < allOrder.length; i++) {
        const cart = new Cart(allOrder[i].Cart);
        const arr = cart.generateArray();

        for (var j = 0; j < arr.length; j++) {
            for (var k = 0; k < allProduct.length; k++) {
                if (arr[j].item._id.toString() === allProduct[k]._id.toString()) {

                    products[k].qty += arr[j].qty;
                    products[k].total += arr[j].price;
                    break;
                }
            }
        }
    }

    var sumRevenue = 0;
    for (var i = 0; i < products.length; i++) {
        sumRevenue += products[i].total;
    }

    var RevenueDay = [];

    for (var i = 2019; i <= date.getFullYear(); i++) {
        RevenueDay.push(Number(0));
    }

    for (var i = 2019; i <= date.getFullYear(); i++) {
        for (var j = 0; j < allOrder.length; j++) {
            var time = new Date(allOrder[j].Time);
            if (time.getFullYear().toString() === i.toString() ) {
                RevenueDay[i - 2019] += allOrder[j].Cart.totalPrice;
            }
        }
    }

    var label = [];
    var color = [];
    var data = [];
    for (var i = 2019; i <= date.getFullYear(); i++) {
        label.push(i.toString());
        color.push(random_rgba());
        data.push(RevenueDay[i - 2019].toString());
    }
    const text = "DOANH SỐ BÁN HÀNG QUA CÁC NĂM";

    res.render('ThongKe/TKNam.hbs', { products, sumRevenue,label: JSON.stringify(label), color: JSON.stringify(color), data: JSON.stringify(RevenueDay), text: JSON.stringify(text)  });
}

module.exports.statisticalYear = async (req, res, next) => {
    const date =  new Date(Date.now());
    var products = [];
    const allProduct = await productService.getAllProduct();
    const allOrder = await orderService.getAllSucessOrder();
    var year = req.query.year || date.getFullYear();

    for (var i = 0; i < allProduct.length; i++) {
        products.push({
            product: allProduct[i],
            qty: Number(0),
            total: Number(0)
        });
    }

    for (var i = 0; i < allOrder.length; i++) {
        const time = new Date(allOrder[i].Time);
        if (time.getFullYear().toString() === year.toString()) {
            const cart = new Cart(allOrder[i].Cart);
            const arr = cart.generateArray();

            for (var j = 0; j < arr.length; j++) {
                for (var k = 0; k < allProduct.length; k++) {
                    if (arr[j].item._id.toString() === allProduct[k]._id.toString()) {

                        products[k].qty += arr[j].qty;
                        products[k].total += arr[j].price;
                        break;
                    }
                }
            }
        }

    }

    var sumRevenue = 0;
    for (var i = 0; i < products.length; i++) {
        sumRevenue += products[i].total;
    }

    var RevenueDay = [];

    for (var i = 1; i <= 12; i++) {
        RevenueDay.push(Number(0));
    }

    for (var i = 1; i <= 12; i++) {
        for (var j = 0; j < allOrder.length; j++) {
            var time = new Date(allOrder[j].Time);
            if (time.getFullYear().toString() === year.toString() && (time.getMonth() + 1).toString() === i.toString()) {
                RevenueDay[i - 1] += allOrder[j].Cart.totalPrice;
            }
        }
    }

    var label = [];
    var color = [];
    var data = [];
    for (var i = 1; i <= 12; i++) {
        label.push("T" + i.toString());
        color.push(random_rgba());
        data.push(RevenueDay[i - 1].toString());
    }
    const text = "DOANH SỐ BÁN HÀNG CÁC THÁNG TRONG NĂM " + year.toString();
    const pos = (year - 2019).toString();
    res.render('ThongKe/TKNam.hbs', { products, sumRevenue, year, pos, label: JSON.stringify(label), color: JSON.stringify(color), data: JSON.stringify(RevenueDay), text: JSON.stringify(text)  });

}

module.exports.statisticalMonth = async (req, res, next) => {
    const date =  new Date(Date.now());
    var products = [];
    const allProduct = await productService.getAllProduct();
    const allOrder = await orderService.getAllSucessOrder();
    const year = req.query.year || date.getFullYear();
    const month = req.query.month || date.getMonth() +1;

    for (var i = 0; i < allProduct.length; i++) {
        products.push({
            product: allProduct[i],
            qty: Number(0),
            total: Number(0)
        });
    }

    for (var i = 0; i < allOrder.length; i++) {
        var time = new Date(allOrder[i].Time);
        if (time.getFullYear().toString() === year.toString() && (time.getMonth() + 1).toString() === month.toString()) {
            const cart = new Cart(allOrder[i].Cart);
            const arr = cart.generateArray();

            for (var j = 0; j < arr.length; j++) {
                for (var k = 0; k < allProduct.length; k++) {
                    if (arr[j].item._id.toString() === allProduct[k]._id.toString()) {

                        products[k].qty += arr[j].qty;
                        products[k].total += arr[j].price;
                        break;
                    }
                }
            }
        }

    }

    var sumRevenue = 0;
    for (var i = 0; i < products.length; i++) {
        sumRevenue += products[i].total;
    }

    const pos = {
        year: (year - 2019).toString(),
        month: (month - 1).toString()
    }


    var RevenueDay = [];

    for (var i = 1; i <= 31; i++) {
        RevenueDay.push(Number(0));
    }

    for (var i = 1; i <= 31; i++) {
        for (var j = 0; j < allOrder.length; j++) {
            var time = new Date(allOrder[j].Time);
            if (time.getFullYear().toString() === year.toString() && (time.getMonth() + 1).toString() === month.toString() && time.getDate().toString() === i.toString()) {
                RevenueDay[i - 1] += allOrder[j].Cart.totalPrice;
            }
        }
    }

    var label = [];
    var color = [];
    var data = [];
    for (var i = 1; i <= 31; i++) {
        label.push("N" + i.toString());
        color.push(random_rgba());
        data.push(RevenueDay[i - 1].toString());
    }
    
    const text = "DOANH SỐ BÁN HÀNG CÁC NGÀY TRONG THÁNG" + month.toString() + " NĂM " + year.toString(); 

    res.render('ThongKe/TKNam.hbs', { products, sumRevenue, month, pos, label: JSON.stringify(label), color: JSON.stringify(color), data: JSON.stringify(RevenueDay), text: JSON.stringify(text) });
}

module.exports.statisticalDay = async (req, res, next) => {
    const date =  new Date(Date.now());
    var products = [];
    const allProduct = await productService.getAllProduct();
    const allOrder = await orderService.getAllSucessOrder();
    const year = req.query.year || date.getFullYear();
    const month = req.query.month || date.getMonth() +1 ;
    const day = req.query.day || date.getDate();

    for (var i = 0; i < allProduct.length; i++) {
        products.push({
            product: allProduct[i],
            qty: Number(0),
            total: Number(0)
        });
    }

    for (var i = 0; i < allOrder.length; i++) {
        const time = new Date(allOrder[i].Time);
        if (time.getFullYear().toString() === year.toString() && (time.getMonth() + 1).toString() === month.toString() && time.getDate().toString() === day.toString()) {
            const cart = new Cart(allOrder[i].Cart);
            const arr = cart.generateArray();

            for (var j = 0; j < arr.length; j++) {
                for (var k = 0; k < allProduct.length; k++) {
                    if (arr[j].item._id.toString() === allProduct[k]._id.toString()) {

                        products[k].qty += arr[j].qty;
                        products[k].total += arr[j].price;
                        break;
                    }
                }
            }
        }

    }

    var sumRevenue = 0;
    for (var i = 0; i < products.length; i++) {
        sumRevenue += products[i].total;
    }

    const pos = {
        year: (year - 2019).toString(),
        month: (month - 1).toString(),
        day: (day - 1).toString()
    }
    res.render('ThongKe/TKNam.hbs', { products, sumRevenue, day, pos });
};