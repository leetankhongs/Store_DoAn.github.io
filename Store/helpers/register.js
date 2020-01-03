module.exports.fromIntToStringMoney = function(integer) {
    var temp = Number(integer) ;
    var string ="";
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

module.exports.toCompactTime = function(string) {
    var temp = String(string);
    var arrayofchars = temp.split("GMT+0700 (Indochina Time)");
    var strtoarray = arrayofchars.reverse();
    var newstring = strtoarray.join("");  
    return newstring;
  }