/**
 * intersection
 * [获取两个数组的交集]
 * @param  {[Array]} arr1 []
 * @param  {[Array]} arr2 []
 * @return {[Array]}      []
 */
function intersection(arr1,arr2) {

    if(!Array.isArray(arr1)||!Array.isArray(arr2)){
        console.warn(`intersection方法的两个参数必须为数组！`)
        return
    }
    arr1 = arr1.sort()
    arr2 = arr2.sort()
    
    var a = 0;
    var b = 0;
    var arr = [];
    while (a < arr1.length && b < arr2.length) {
        if (arr1[a] < arr2[b]) {a++;}
        else if (arr1[a] > arr2[b]){ b++;}
        else if (arr1[a] == arr2[b]) {
            arr.push(arr1[a]);
            a++;
            b++;
        }

    }

    return arr;
}

export {
    intersection
}