var datum = document.getElementById("datum");
var result = document.getElementById("result");

var ordinalNr = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth", "sixteenth", "seventeenth", "eighteenth", "nineteenth", "twentieth"];
var zehnerArr = ["twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var countArr = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];

// aktuelles Datum in Input einfügen
var d = new Date();
var aktt = d.getDate();
var aktm = d.getMonth() + 1;
var aktj = d.getFullYear();

if(aktt < 10) {
  aktt = "0" + aktt;
}
if(aktm < 10) {
  aktm = "0" + aktm;
}
datum.value = aktt + "." + aktm+ "." + aktj;

// eigentliche Translation
document.getElementById("form").addEventListener("submit", function(event) {
  event.preventDefault();
  var datumInput = datum.value.split(".");
  result.innerHTML = "the " + getTag(datumInput[0]) + " of " + getMonat(datumInput[1]) + " " + getJahr(datumInput[2]);
  result.select();
  document.execCommand('copy');
});

function getTag(day) {
  if(day <= 20) {
    return ordinalNr[day - 1];
  }
  else if(day == 30 ) {
    return "thirtieth";
  }
  else {
    var zehner = zehnerArr[day[0] - 2];
    var einer = ordinalNr[day[1] - 1];
    return zehner + "-" + einer;
  }
}

function getMonat(month) {
  return monthNames[month - 1];
}

function getJahr(year) {
  var jt = year[0];
  var jh = year[1];
  var jz = year[2];
  var je = year[3];

  if(year < 2000) {
    if(jz == 0 && je == 0) {
      return countArr[jt + jh] + " hundred";
    }
    else if(jz == 0) {
      return countArr[jt + jh] + " hundred and " + countArr[je];
    }
    else if((jz + je) < 20) {
      return countArr[jt + jh] + " " + countArr[jz + je];
    }
    else if (je == 0) {
      return countArr[jt + jh] + " " + zehnerArr[jz - 2];
    }
    else {
      return countArr[jt + jh] + " " + zehnerArr[jz - 2] + "-" + countArr[je];
    }
  }
  else if (year == 2000) {
    return "two thousand";
  }
  else if (jz == 0) {
    return "two thousand and " + countArr[je];
  }
  else if ((jz + je) < 20) {
    return "two thousand and " + countArr[jz + je];
  }
  else if (je == 0) {
    return "two thousand and " + zehnerArr[jz - 2];
  }
  else {
    return "two thousand and " + zehnerArr[jz - 2] + "-" + countArr[je];
  }
}
