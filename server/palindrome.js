//Palindrome шалгагч. 2 цэгийн
var longestPalindrome = function (s) {
  let longest = '';
  const findLongestPalindrome = (str, i, j) => {
    while (i >= 0 && j < str.length && str[i] === str[j]) {
      i -= 1;
      j += 1;
    }
    // [0,0] ==> "b"
    // [0,1] ==> "" hooson butsna.
    // Palindrome-oo string-ээр буцаана
    return str.slice(i + 1, j);
  };

  for (let i = 0; i < s.length; i++) {
    // Төв цэгээс 2 тийшээгээ 1 юмуу 2 үсгээр хайгаад явна.
    // 1 цэгээс 2 тийшээ шалгаад явна. Жнь "bab" ийм тохиолдолд...
    const current1 = findLongestPalindrome(s, i, i); // 0,0

    // 2 цэгээс 2 тийшээ шалгаад явна. Жнь "baab" ийм тохиолдолд...
    const current2 = findLongestPalindrome(s, i, i + 1); //0,1

    // 2 палиндромын хамгийн их урттайг нь хадгалаад буцаана.
    const longerPalindrome =
      current1.length > current2.length ? current1 : current2;
    if (longerPalindrome.length > longest.length) {
      longest = longerPalindrome;
    }
  }
  return longest;
};
console.log(longestPalindrome('babad'));
