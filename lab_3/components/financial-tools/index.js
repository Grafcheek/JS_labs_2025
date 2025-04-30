// components/financial-tools/index.js
export class FinancialTools {
    // 1. Сумма квадратов
    sumOfSquares(arr) {
      return arr.reduce((sum, num) => sum + num * num, 0);
    }
  
    // 2. Сумма и произведение
    getSumAndMultOfArray(arr) {
      const sum = arr.reduce((a, b) => a + b, 0);
      const product = arr.reduce((a, b) => a * b, 1);
      return { sum, product };
    }
  
    // 3. Качественная разница
    maxQualityDifference(nums) {
      if (nums.length < 4) return 0;
      
      const sortedDesc = [...nums].sort((a, b) => b - a);
      const max1 = sortedDesc[0] * sortedDesc[1];
      const max2 = sortedDesc[2] * sortedDesc[3];
      
      const sortedAsc = [...nums].sort((a, b) => a - b);
      const min1 = sortedAsc[0] * sortedAsc[1];
      const min2 = sortedAsc[2] * sortedAsc[3];
      
      return Math.max(max1 - min1, max1 - min2, max2 - min1, max2 - min2);
    }
  
    // 4. Анаграммы
    groupAnagrams(words) {
      const groups = {};
      
      for (const word of words) {
        const sorted = word.toLowerCase().split('').sort().join('');
        if (!groups[sorted]) groups[sorted] = [];
        groups[sorted].push(word);
      }
      
      return Object.values(groups)
        .filter(group => group.length >= 2)
        .map(group => group.sort())
        .sort((a, b) => a[0].localeCompare(b[0]));
    }
}