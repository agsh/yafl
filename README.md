#YAFL
Yet another functional library similar to LINQ


##Examples

```javascript
// Fold
_.return('[1..5]').foldl(function(a,b) {
	return a*b;
}, 1).toArray()
/* returns: [ 1, 2, 6, 24, 120 ] */

_.return([1,2,3,4,5]).foldrNow(function(a,b) {
	return a+b;
}, 0);
/* returns: [ 0, 5, 9, 12, 14, 15 ] */


// Map and filter
var array = [
	{
		city : 'Санкт-Петербург', 
		type : 'Колледж', 
		name : 'Технический Колледж Управления И Коммерции',
		address : {
			street : 'Кондратьевский проспект',
			house: '46'
		}
	},{
		city : 'Москва',
		type : 'Университет',
		name : 'НИЯУ МИФИ',
		address : {
			street : 'Каширское шоссе',
			house: '31'
		}
	},{
		city : 'Москва',
		type : 'ТЦ',
		name : 'Европейский ТРЦ',
		address : {
			street : 'площадь Киевского Вокзала',
			house: 'д.2'
		}
	},{
		city : 'Волгоград',
		type : 'Больница',
		name : 'Волгоградская областная клиническая больница № 1',
		address : {
			street : 'Ангарская улица',
			house: '13'
		}
	}
];

_.return(array).filter(function(obj) {
	if (obj.city == 'Москва') return true;				
	else return false
}).map(function (obj) {
	if (obj.type == 'Университет') {
		var str = obj.name + ' - ';
		_.return(obj.address).forEach(function (address) {
		str += address + ' ';
		});
		console.log(str);
	}	
}).toArray();
/* returns: НИЯУ МИФИ – Каширское шоссе 31 */


// Zip
var data = [
	"Максим Чуркин"
	, "Вера Аминова"
	, "Дарья Грекова"
	, "Иван Демкович"
	, "Денис Дубленых"
	, "Алексей Королев"
	, "Дмитрий Зонин"
	, "Дмитрий Карпов"
	, "Вадим Шакуро"
	, "Кирилл Корнюхин"
	, "Александр Чегодаев"
	, "Павел Скрипниченко"
];
var rndPoints = _.return('[1,1..]').map(function(a){return _.random(1,100);});

_.return(data).zipWith(
	function(name, pos) {
		return pos + ') ' + name;
	}
	, _.return('[1,1..]')
)
	.zipWith(
	function(item, points) {
		return item + ' - ' + points + ' points'
	}
	, rndPoints
)
	.toArray().join('\n');
/* returns:
 1) Максим Чуркин - 47 points
 2) Вера Аминова - 14 points
 3) Дарья Грекова - 3 points
 4) Иван Демкович - 6 points
 5) Денис Дубленых - 79 points
 6) Алексей Королев - 66 points
 7) Дмитрий Зонин - 14 points
 8) Дмитрий Карпов - 42 points
 9) Вадим Шакуро - 44 points
 10) Кирилл Корнюхин - 2 points
 11) Александр Чегодаев - 57 points
 12) Павел Скрипниченко - 18 points
 */


//Global
 data.kill({ global: 'tree' });
 data.set('tree', 'node_1', 'value_1');
 data.set('tree', 'node_2', 'value_2');
 data.set('tree', 'node_3', 'value_3');

 data._cacheInstance = true;
 data._global = 'tree';
 data._subscripts = [];

 _.return(data).forEach(function(node) {
     /*
     returns:
         {
             _cacheInstance: true,
             _global: 'tree',
             _subscripts: [ 'node_1' ]
         }
         {
             _cacheInstance: true,
             _global: 'tree',
             _subscripts: [ 'node_2' ]
         }
         {
             _cacheInstance: true,
             _global: 'tree',
             _subscripts: [ 'node_3' ]
         }
     */
     _.return(node).map(function(value) {
         /*
         returns:
             value_1
             value_2
             value_3
         */
     }).toArray();
 });

data.kill({ global: 'students' });
data.set('students', 3, 1, 'K6-221');
data.set('students', 3, 1, 1 , 'Maxim Churkin');
data.set('students', 3, 1, 2 , 'Vera Aminova');
data.set('students', 3, 1, 3 , 'Daria Grekova');
data.set('students', 3, 1, 4 , 'Ivan Demkovich');
data.set('students', 4, 1, 'K8-221');
data.set('students', 4, 1, 1 , 'Denis Dublenih');
data.set('students', 4, 1 ,2 , 'Aleksey Korolev');
data.set('students', 4, 1 ,3 , 'Dmitriy Zonin');
data.set('students', 4, 1 ,4 , 'Dmitriy Karpov');
data.set('students', 4, 2, 'K8-222');
data.set('students', 4, 2, 1 , 'Vadim Shkuro');
data.set('students', 4, 2, 2 , 'Kirill Kornuhin');
data.set('students', 4, 2, 3 , 'Aleksander Chagataev');
data.set('students', 4, 2, 4 , 'Pavel Skripchenko');

data._cacheInstance = true;
data._global = 'students';
data._subscripts = [];

_.return(data).forEach(function(course) {
    //console.log(course);
    _.return(course).forEach(function(group) {
        //console.log(group);
        _.return(group).filter(function(students) {
            return students._value.match(/K8/) !== null;
        }).map(function(students) {
            _.return(students).forEach(function(value) {
                console.log(value);
            });
        }).toArray();
    });
});
/* returns:
 Denis Dublenih
 Aleksey Korolev
 Dmitriy Zonin
 Dmitriy Karpov
 Vadim Shkuro
 Kirill Kornuhin
 Aleksander Chagataev
 Pavel Skripchenko
 */
```
