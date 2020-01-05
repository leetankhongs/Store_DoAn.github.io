const products = require("../models/productModel");
const productService = require("../services/productService");

exports.detailProduct = async (req, res, next) => {
  const product = await productService.findProductByID(req.query.id);
  const sameBrand = await productService.findProductByBrandWithLimit(req.params.Brand, 6);

  var comment = product.Comment;

  if (comment) {
    var page = parseInt(req.query.commentpage) || 1;
    const count = product.Comment.length;

    const limit = 5;
    const start = (page - 1) * limit;
    const end = page * limit;

    let pages = [];

    let previous = (page - 1 < 1) ? page : page - 1;
    let current = page;
    let next = (page + 1 > Math.ceil(count / limit)) ? page : page + 1;

    for (var i = 1; i <= Math.ceil(count / limit); i++) {
      pages[i] = {
        pos: i,
        id: req.query.id,
        Brand: req.params.Brand
      }
    }

    comment = comment.slice(start, end);
    res.render('DetailProduct.hbs', { output: product, sameBrand: sameBrand, Comment: comment, pages: pages, pos: { previous: previous, current: current, next: next } });

  }

  res.render('DetailProduct.hbs', { output: product, sameBrand: sameBrand, Comment: comment });

}

exports.brand = async (req, res, next) => {
  const sort = req.query.sort || 0;
  var typeSort = null;

  if (parseInt(req.query.sort) === 1)
    typeSort = { Name: 1 };
  if (parseInt(req.query.sort) === 2)
    typeSort = { Name: -1 }
  if (parseInt(req.query.sort) === 3)
    typeSort = { Cost: 1 }
  if (parseInt(req.query.sort) === 4)
    typeSort = { Cost: -1 }


  const laptop = await productService.findProductByBrandWithSort(req.params.Brand, typeSort);
  const count = await productService.countDocumentsByBrand(req.params.Brand);

  var temp = [];
  var pos = 0;
  var sl = 1;

  while (pos < laptop.length) {
    if (sl === 1) {
      temp.push({
        laptop: laptop.slice(pos, pos + 3),
        pos: sl,
        active: true
      });
    }
    else
    {
      temp.push({
        laptop: laptop.slice(pos, pos + 3),
        pos: sl
      });
    }
    pos += 3;
    sl++;
  }
  res.render('BrandProduct.hbs', {
    Brand: req.params.Brand, count: count, sort: sort, temp
  });
}


exports.searchPost = (req, res, next) => {
  const require = req.query.require || req.body.require;
  const typeSort = req.body.sort || 0;

  if (typeSort === 0)
    res.redirect('/product/search?require=' + require);
  else
    res.redirect('/product/search?require=' + require + '&sort=' + typeSort);

}

exports.search = async (req, res, next) => {
  const sort = req.query.sort || req.body.sort || 0;
  var typeSort;

  if (parseInt(req.query.sort) === 1)
    typeSort = { Name: 1 };
  if (parseInt(req.query.sort) === 2)
    typeSort = { Name: -1 }
  if (parseInt(req.query.sort) === 3)
    typeSort = { Cost: 1 }
  if (parseInt(req.query.sort) === 4)
    typeSort = { Cost: -1 }
  if (sort === 0)
    typeSort = {};

  const require = req.query.require;

  const product = await productService.getAllSortedProduct(typeSort);

  var result = [];
  var count = 0;
  for (var i = 0; i < product.length; i++) {
    if (String(product[i].Name).toLocaleLowerCase().includes(String(require.toLocaleLowerCase())) || String(product[i].Brand).toLocaleLowerCase().includes(String(require.toLocaleLowerCase()))
      || String(product[i].TypeProduct).toLocaleLowerCase().includes(String(require.toLocaleLowerCase()))) {
      result[count] = product[i];
      count++;
    }
  }

  var temp = [];
  var pos = 0;
  var sl = 1;
  while (pos < result.length) {
    if (sl === 1) {
      temp.push({
        laptop: result.slice(pos, pos + 3),
        pos: sl,
        active: true
      });
    }
    else
    {
      temp.push({
        laptop: result.slice(pos, pos + 3),
        pos: sl
      });
    }
    pos += 3;
    sl++;
  }

  res.render('searchProduct.hbs', { require: require,  sort: sort, temp });
}

exports.comment = (req, res, next) => {
  var name = req.user.Name;
  var content = req.body.content;
  var productid = req.query.id;
  var backURL = req.header('Referer') || '/';

  if (content) {
    var commentz = { "name": name, "content": content };

    products.findByIdAndUpdate(productid, { $push: { Comment: commentz } }, function (err, products) {
      if (err) console.log(err);
      res.redirect(backURL);
    });
  }
  else {
    res.redirect(backURL);
  }


}


