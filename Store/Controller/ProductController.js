const products = require("../models/productModel");

exports.detailProduct = async (req,res, next) =>
{
    const product = await products.findById(req.query.id) ;
    const sameBrand = await products.find({Brand: req.params.Brand}).limit(6);
    res.render('DetailProduct.hbs', {output: product, sameBrand: sameBrand});

}

exports.brand = async (req,res, next) =>
{
      const sort = req.query.sort || 0;
      var typeSort;

      if(parseInt(req.query.sort) === 1)
        typeSort ={Name: 1};
      if(parseInt(req.query.sort) ===2)
        typeSort ={Name: -1}
      if(parseInt(req.query.sort) ===3)
        typeSort = {Cost: 1}
      if(parseInt(req.query.sort) ===4)
        typeSort = {Cost: -1}

      const laptop = await products.find({Brand: req.params.Brand}).sort(typeSort)

      const count = await  products.countDocuments({Brand: req.params.Brand})
  
      var page = parseInt(req.query.page) || 1;
      const limit = 3;
      const start = (page - 1) * limit;
      const end = page * limit;
      const pages = [];
  
      for(var i =1; i<= Math.ceil(count/limit) ; i++)
      {
        pages[i] = {
        pos : i,
        sort: sort,
        brand: req.params.Brand
        }
      }
  
      res.render('BrandProduct.hbs',{laptops: laptop.slice(start,end), Brand: req.params.Brand, count: count, pages: pages, 
            currentPage: {pre: page -1 < 1 ? page:page-1, current: page, pos: page + 1 > Math.ceil(count/limit)? page: page+1} , sort: sort});
}


exports.searchPost = (req, res, next)=>
{
  const require = req.query.require||req.body.require ;
  const typeSort = req.body.sort||0;
  
  if(typeSort === 0)
    res.redirect('/product/search?require='+require );
  else
    res.redirect('/product/search?require='+require +'&sort=' + typeSort);

}

exports.search = async (req, res, next) =>
{
  const sort = req.query.sort || req.body.sort || 0;
  var typeSort;

  if(parseInt(req.query.sort) === 1)
    typeSort ={Name: 1};
  if(parseInt(req.query.sort) ===2)
    typeSort ={Name: -1}
  if(parseInt(req.query.sort) ===3)
    typeSort = {Cost: 1}
  if(parseInt(req.query.sort) ===4)
    typeSort = {Cost: -1}
  if(sort === 0)
    typeSort={};

  const require = req.query.require;
  const product = await products.find().sort(typeSort);

  var result = [];
  var count = 0;
  for(var i = 0; i<product.length; i++)
  {
    if(String(product[i].Name).toLocaleLowerCase().includes(String(require.toLocaleLowerCase()))|| String(product[i].Brand).toLocaleLowerCase().includes(String(require.toLocaleLowerCase()))
      || String(product[i].TypeProduct).toLocaleLowerCase().includes(String(require.toLocaleLowerCase())))
    {
          result[count] = product[i];
          count++;
    }
  }
  
  var page = parseInt(req.query.page) || 1;
  const limit = 3;  
  const start = (page - 1) * limit;
  const end = page * limit;

  const pages = [];
  
  for(var i =1; i<= Math.ceil(count/limit) ; i++)
  {
    pages[i] = {
    pos : i,
    sort: sort,
    require: require
    }
  }

  res.render('searchProduct.hbs', {products: result.slice(start, end), require: require,pages: pages, positionPage: {pre: page-1 < 1? page: page-1, current: page, pos: page + 1 > Math.ceil(count/limit)? page: page+1}, sort: sort});
}



