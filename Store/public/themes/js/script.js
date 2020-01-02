
function changeInput(id) {
	var x = Number(document.getElementById(id).value);
	var costString = document.getElementById(id + 'Cost').innerHTML;
	const cost = convertStringToInt(costString);
	if (x <= 0) {
		x = 1;
		document.getElementById(id).value = x;
	}
	document.getElementById(id + 'Sum').innerHTML = convertIntToString(cost * x);

	const productsSum = document.getElementsByClassName("Sum");
	var total = 0;

	for (var i = 0; i < productsSum.length; i++) {
		total += convertStringToInt(productsSum[i].innerHTML);
	}
	document.getElementById('totalPrice').innerHTML = convertIntToString(total);;
	document.getElementById('toltalPriceLayout').innerHTML = convertIntToString(total);

}
function reduce(id) {
	const x = Number(document.getElementById(id).value);
	var costString = document.getElementById(id + 'Cost').innerHTML;
	const cost = convertStringToInt(costString);
	if (x - 1 <= 0)
		return;
	document.getElementById(id).value = (x - 1).toString();
	document.getElementById(id + 'Sum').innerHTML = convertIntToString(cost * (x - 1));

	const productsSum = document.getElementsByClassName("Sum");
	var total = 0;

	for (var i = 0; i < productsSum.length; i++) {
		total += convertStringToInt(productsSum[i].innerHTML);
	}
	document.getElementById('totalPrice').innerHTML = convertIntToString(total);
	document.getElementById('toltalPriceLayout').innerHTML = convertIntToString(total);



}
function increase(id) {
	const x = Number(document.getElementById(id).value);
	var costString = document.getElementById(id + 'Cost').innerHTML;
	const cost = convertStringToInt(costString);
	document.getElementById(id).value = (x + 1).toString();
	document.getElementById(id + 'Sum').innerHTML = convertIntToString(cost * (x + 1));
	const productsSum = document.getElementsByClassName("Sum");
	var total = 0;

	for (var i = 0; i < productsSum.length; i++) {
		total += convertStringToInt(productsSum[i].innerHTML);
	}
	document.getElementById('totalPrice').innerHTML = convertIntToString(total);
	document.getElementById('toltalPriceLayout').innerHTML = convertIntToString(total);


}
function convertIntToString(integer) {
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

function convertStringToInt(string)
{
	var stringtemp = String(string);
	var arrayofcharstemp = stringtemp.split("đ");
	var temp = arrayofcharstemp.join("");
	var arrayofchars = temp.split(".");
	var newstring = arrayofchars.join("");
	return parseInt(newstring) ;
}