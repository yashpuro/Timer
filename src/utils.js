export function timeConvert(time) {
	const num = time;
	const hours = num / 60;
	const rhours = Math.floor(hours);
	const minutes = (hours - rhours) * 60;
	const rminutes = Math.round(minutes);
	const formatHours = rhours > 9 ? rhours : `0` + rhours.toString();
	const formatMinutes = rminutes > 9 ? rminutes : `0` + rminutes.toString();
	return formatHours + ':' + formatMinutes;
}
