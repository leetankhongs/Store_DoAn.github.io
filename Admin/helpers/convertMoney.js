module.exports.convertMoney = function(integer) {
    var temp = Number(integer) ;
    var string ="";
    if(integer === 0)
      string += "0";
    var dem=0;
  
    while(temp > 0)
    {
      string += (temp % 10).toString();
      temp = parseInt (temp/10);
      dem++;
      if(dem===3 & temp!==0)
      {
        string +='.';
        dem=0;
      }
    }
    var arrayofchars = string.split("");
    var strtoarray = arrayofchars.reverse();
    var newstring = strtoarray.join("");
    newstring +="đ";
    return newstring;
  }