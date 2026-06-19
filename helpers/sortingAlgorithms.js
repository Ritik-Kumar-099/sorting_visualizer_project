const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
}

const defaultCompare = (a,b) => {
    if (a===b){
        return 0
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

let swaps = []

const partition = (array,left,right,compareFn) => {
    const pivot = array[Math.floor((right + left)/2)]

    let i = left
    let j = right

    while(i<=j){
        while(compareFn(array[i],pivot) === Compare.LESS_THAN) {
            i++
        } 
        while(compareFn(array[j],pivot) === Compare.BIGGER_THAN) {
            j--
        } 
        if(i<=j){
            let temp = array[i]
            array[i] = array[j]
            array[j] = temp
            swaps.push({firstPosition: i,lastPosition: j})
            i++
            j--
        }
    }
    return i
}

const quick = (array,left,right,compareFn) => {
  let index
  
  if(array.length > 1){
    index = partition(array,left,right,compareFn)
    if(left < index - 1) {
        quick(array,left,index-1,compareFn)
    }
    if (index < right) {
        quick(array,index,right,compareFn)
    }
  }
  return array
}

const mergeSortHelper = (array, left, right) =>{
    if (left >= right) return
    const mid = Math.floor((left + right) / 2)
    mergeSortHelper(array, left, mid)
    mergeSortHelper(array, mid + 1, right)
    merge(array, left, mid, right)
}


const merge=(array, left, mid, right) => {
    const temp = []
    let i = left, j = mid + 1

    while (i <= mid && j <= right) {
        if (array[i] <= array[j]) {
            temp.push(array[i++])
        } else {
            temp.push(array[j++])
        }
    }

    while (i <= mid) temp.push(array[i++])
    while (j <= right) temp.push(array[j++])

    for (let k = 0; k < temp.length; k++) {
        if (array[left + k] !== temp[k]) {
            swaps.push({ firstPosition: left + k, lastPosition: array.indexOf(temp[k]) })
            [array[left + k], array[array.indexOf(temp[k])]] = [array[array.indexOf(temp[k])], array[left + k]]

        }
        array[left + k] = temp[k]
    }
}


class SortingAlgorithms{

    bubbleSort(array){
        const swaps = []
        for(let i=0;i<array.length;i++){
            for(let j=0;j<array.length-i-1;j++){
                // const element = array[i];
                if(array[j]>array[j+1]){
                    let temp=array[j]
                    array[j]=array[j+1]
                    array[j+1]=temp
                    swaps.push({firstPosition:j,lastPosition:j+1})
                }
            }
        }
        return swaps
    }

    selectionSort(array){
        const swaps = []
        let min
        for(let i=0;i<array.length-1;i++){
            min=i
            for(let j=i+1;j<array.length;j++){
                if(array[j]<array[min]){
                    min=j
                }
            }
            let temp = array[min]
            array[min] = array[i]
            array[i] = temp 
            swaps.push({ firstPosition: min, lastPosition: i})
        }
        return swaps
    }

    insertionSort(array){
        const swaps = []
        let key
        let j
        for(let i=1;i<array.length;i++){
            key=array[i];
            j=i-1;
            while(j>=0 && array[j]>key){
                array[j+1]=array[j];
                swaps.push({ firstPosition: j+1, lastPosition: j})
                j--;
            }
            array[j+1]=key;
        }
        return swaps
    }

    quickSort(array,compareFn = defaultCompare){
        swaps=[]
        quick(array,0,array.length-1,compareFn)
        return swaps
    }
    
    mergeSort(array) {
        swaps = []
        mergeSortHelper(array, 0, array.length - 1)
        return swaps
    }

    
    // merge(array, left, mid, right) {
    //     const temp = []
    //     let i = left, j = mid + 1

    //     while (i <= mid && j <= right) {
    //         if (array[i] <= array[j]) {
    //             temp.push(array[i++])
    //         } else {
    //             temp.push(array[j++])
    //         }
    //     }

    //     while (i <= mid) temp.push(array[i++])
    //     while (j <= right) temp.push(array[j++])

    //     for (let k = 0; k < temp.length; k++) {
    //         if (array[left + k] !== temp[k]) {
    //             swaps.push({ firstPosition: left + k, lastPosition: array.indexOf(temp[k]) })
    //         }
    //         array[left + k] = temp[k]
    //     }
    // }

    // countSort(array) {
    //     swaps = []
    //     const max = 250
    //     const count = new Array(max + 1).fill(0)

    //     for (let i = 0; i < array.length; i++) {
    //         count[array[i]]++
    //     }

    //     let index = 0
    //     for (let i = 0; i < count.length; i++) {
    //         while (count[i] > 0) {
    //             // if (array[index] != i) {
    //                 let temp=array[index]
    //                 array[index]=array[array.indexOf(i)]
    //                 array[array.indexOf(i)]=temp
    //                 swaps.push({ firstPosition: array.indexOf(i), lastPosition: index })
    //                 // [array[index], array[array.indexOf(i)]] = [array[array.indexOf(i)], array[index]]
    //             // }
    //             array[index++] = i
    //             count[i]--
    //         }
    //     }
    //     return swaps
    // }

    countSort(array) {
        swaps = []
        const n = array.length
        if (n === 0) return swaps
    
        const max = Math.max(...array)
        const count = new Array(max + 1).fill(0)
    
        // Count occurrences
        for (let i = 0; i < n; i++) {
            count[array[i]]++
        }
    
        // Build the sorted array and simulate swaps
        let index = 0
        for (let i = 0; i < count.length; i++) {
            while (count[i] > 0) {
                if (array[index] !== i) {
                    let oldIndex = array.indexOf(i, index)
                    swaps.push({ firstPosition: index, lastPosition: oldIndex })
    
                    // Simulate swap
                    [array[index], array[oldIndex]] = [array[oldIndex], array[index]]
                }
                index++
                count[i]--
            }
        }
    
        return swaps
    }
    

    heapSort(array) {
        swaps = []
        const n = array.length

        const heapify = (arr, n, i) => {
            let largest = i
            let l = 2 * i + 1
            let r = 2 * i + 2

            if (l < n && arr[l] > arr[largest]) largest = l
            if (r < n && arr[r] > arr[largest]) largest = r

            if (largest !== i) {
                [arr[i], arr[largest]] = [arr[largest], arr[i]]
                swaps.push({ firstPosition: i, lastPosition: largest })
                heapify(arr, n, largest)
            }
        }

        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(array, n, i)
        for (let i = n - 1; i > 0; i--) {
            [array[0], array[i]] = [array[i], array[0]]
            swaps.push({ firstPosition: 0, lastPosition: i })
            heapify(array, i, 0)
        }
        return swaps
    }
    
        
    
    


}

export{
    SortingAlgorithms
}
