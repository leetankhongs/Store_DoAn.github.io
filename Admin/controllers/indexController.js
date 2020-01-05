
const productService = require('../services/productService');
const orderService = require('../services/orderService');
const Cart = require('../models/cartModel');

module.exports.statistical = async (req, res, next) => {
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
    res.render('ThongKe/TKNam.hbs', { products, sumRevenue });
  }
  
module.exports.statisticalYear = async (req, res, next) => {
    var products = [];
    const allProduct = await productService.getAllProduct();
    const allOrder = await orderService.getAllSucessOrder();
    var year = req.query.year || 2019;
  
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
    const pos = (year - 2019).toString();
    res.render('ThongKe/TKNam.hbs', { products, sumRevenue, year, pos });

}

module.exports.statisticalMonth = async (req, res, next) => {
    var products = [];
    const allProduct = await productService.getAllProduct();
    const allOrder = await orderService.getAllSucessOrder();
    const year = req.query.year || 2019;
    const month = req.query.month || 1;
  
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
    res.render('ThongKe/TKNam.hbs', { products, sumRevenue, month, pos });
  }

  module.exports.statisticalDay = async (req, res, next) => {
    var products = [];
    const allProduct = await productService.getAllProduct();
    const allOrder = await orderService.getAllSucessOrder();
    const year = req.query.year || 2019;
    const month = req.query.month || 1;
    const day = req.query.day || 1;
  
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