
function changeInput(id)
{
	var x = Number(document.getElementById(id).value);
			const cost = Number(document.getElementById(id + 'Cost').innerHTML);
			if(x<=0)
			{
				x=1;
				document.getElementById(id).value = x;
			}
						document.getElementById(id + 'Sum').innerHTML = (cost * x ).toString();

			const productsSum = document.getElementsByClassName("Sum");
			var total = 0;

			for (var i = 0; i < productsSum.length; i++) {
				total += Number(productsSum[i].innerHTML);
			}
			document.getElementById('totalPrice').innerHTML = total.toString();;

}
		function reduce(id) {
			const x = Number(document.getElementById(id).value);
			const cost = Number(document.getElementById(id + 'Cost').innerHTML);
			if (x - 1 <= 0)
				return;
			document.getElementById(id).value = (x - 1).toString();
			document.getElementById(id + 'Sum').innerHTML = (cost * (x - 1)).toString();

			const productsSum = document.getElementsByClassName("Sum");
			var total = 0;

			for (var i = 0; i < productsSum.length; i++) {
				total += Number(productsSum[i].innerHTML);
			}
			document.getElementById('totalPrice').innerHTML = total.toString();;
						document.getElementById('toltalPriceLayout').innerHTML = total.toString();;



		}
		function increase(id) {
			const x = Number(document.getElementById(id).value);
			const cost = Number(document.getElementById(id + 'Cost').innerHTML);
			document.getElementById(id).value = (x + 1).toString();
			document.getElementById(id + 'Sum').innerHTML = (cost * (x + 1)).toString();
			const productsSum = document.getElementsByClassName("Sum");
			var total = 0;

			for (var i = 0; i < productsSum.length; i++) {
				total += Number(productsSum[i].innerHTML);
			}
			document.getElementById('totalPrice').innerHTML = total.toString();;
						document.getElementById('toltalPriceLayout').innerHTML = total.toString();;

			
		}
