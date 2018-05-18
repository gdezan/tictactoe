const slot = Array.from(document.querySelectorAll('.slot'));
const mark = Array.from(document.querySelectorAll('.piece'));

const pieceO = "<i class=\"far fa-circle\"></i>"
const pieceX = "<i class=\"fa fa-times\"></i>"
let filled = false;
let piece = pieceX;



for (let i in slot) {
	slot[i].addEventListener('click', () => {
		console.log('yes');
		if (filled) {
			mark[i].style.setProperty('transform', 'scale(0)');
		} else {
			mark[i].innerHTML = piece;
			mark[i].style.setProperty('transform', 'scale(1)');
		}
		filled = !filled;
	})
}