// 1. Reverse the name of the service.
// 2. Lowercase the reversed name.
// 3. Truncate the first and last character of the lowercased reversed name to produce an abbreviation.
// 4. Type the abbreviation.
// 5. Replace every "e" in the abbreviation with the number "3".
// 6. Replace every "a" in the abbreviation with the number "4".
// 7. Replace every "i" in the abbreviation with the number "1".
// 8. Replace every "o" in the abbreviation with the number "0".
// 8. Capitalize every vowel in the abbreviation.
// 8. Append the reversed abbreviation to the end of the site abbreviation.
// 9. Append the same number of "!" as the length of the abbreviation to the end of the site abbreviation.
// 10. Insert the same number of "!" as the length of the abbreviation to the start of the site abbreviation.

const passwordGenerator = (serviceName) => {
  let abbr = serviceName.toLowerCase().split('').reverse();
  abbr.pop();
  abbr.shift();
  abbr = abbr.join('');
  abbr = abbr.replace(/e/g, '3');
  abbr = abbr.replace(/a/g, '4');
  abbr = abbr.replace(/i/g, '1');
  abbr = abbr.replace(/o/g, '0');
  abbr = abbr.replace(/[aeiou]/g, (vowel) => vowel.toUpperCase());
  abbr += abbr.split('').reverse().join('');
  abbr += '!'.repeat(abbr.length);
  abbr = '!'.repeat(abbr.length) + abbr;
  return abbr;
};

console.log(passwordGenerator('Facebook'));
console.log(passwordGenerator('Twitter'));
console.log(passwordGenerator('Discord'));
console.log(passwordGenerator('GitHub'));
