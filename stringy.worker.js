
Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
}

function filter(type,value) {
	switch(type) {
		case 'encode-uri':
			return encodeURI(value);
		break;
		case 'decode-uri':
			return decodeURI(value);
		break;
		case 'encode-uri-component':
			return encodeURIComponent(value);
		break;
		case 'decode-uri-component':
			return decodeURIComponent(value);
		break;
		case 'sort':
			//First, split this shit by carriage returns.
			return value.split("\n").sort(function(a,b) { return (a > b) ? 1 : -1 }).join("\n");
		break;
		case 'dedupe':
			return value.split("\n").getUnique().join("\n");
		break;
		case 'lowercase':
			return value.toLowerCase();
		break;
		case 'uppercase':
			return value.toUpperCase();
		break;
	}
	return value;
}

self.addEventListener('message', function(e) {
	var filters = e.data.filters,
	value 		= e.data.value,
	i;

	//console.log('msg', e.data);
	for(i=0; i < filters.length; i++) {
		value = filter(filters[i], value);
	}

	self.postMessage(value);
});