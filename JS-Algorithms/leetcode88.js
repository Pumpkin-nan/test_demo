/**
 * 地址： https: //github.com/sisterAn/JavaScript-Algorithms/issues/3
 * 题目：给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 num1 成为一个有序数组。
 * 说明：
 * 1. 初始化 nums1 和 nums2 的元素数量分别为 m 和 n。
 * 2. 你可以假设 nums1 有足够的空间（ 空间大小大于或等于 m + n） 来保存 nums2 中的元素。
 * 示例：
 *  输入:
      nums1 = [1,2,3,0,0,0], m = 3
      nums2 = [2,5,6],       n = 3

      输出: [1,2,2,3,5,6]
 * */ 

function concateArray(nums1, nums2) {
  nums1 = nums1.concat(nums2)
  nums1.sort((a, b) => a-b)
  let idx = nums1.lastIndexOf(0)
  if(idx === -1) {
    return nums1
  } else {
    return nums1.splice(idx+1,nums1.length)
  }
}
let arr1 = [1, 2, 3, 0, 0, 0]
let arr2 = [2, 5, 6]

console.log(concateArray(arr1, arr2))