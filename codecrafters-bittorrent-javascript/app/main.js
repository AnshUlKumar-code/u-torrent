const process = require("process");
const util = require("util");

// Examples:
// - decodeBencode("5:hello") -> "hello"
// - decodeBencode("10:hello12345") -> "hello12345"
function decodeBencode(bencodedValue) {
  // Check if the first character is a digit
  if (!isNaN(bencodedValue[0])) {
    const firstColonIndex = bencodedValue.indexOf(":");
    if (firstColonIndex === -1) {
      throw new Error("Invalid encoded value");
    }
    return bencodedValue.substr(firstColonIndex + 1);
  } else if(bencodedValue[0] === "i") {
    const end = bencodedValue.indexOf("e");
    if (end === -1) {
      throw new Error("Invalid encoded value");
    }
    else if(bencodededValue[0]=="l"){
     let list = [];
    let i = 1; // Skip the starting 'l'

    while (bencodedValue[i] !== "e") {

        // String
        if (!isNaN(bencodedValue[i])) {
            const colon = bencodedValue.indexOf(":", i);
            const length = parseInt(bencodedValue.substring(i, colon));

            const str = bencodedValue.substring(
                colon + 1,
                colon + 1 + length
            );

            list.push(str);

            i = colon + 1 + length;
        }

        // Integer
        else if (bencodedValue[i] === "i") {
            const end = bencodedValue.indexOf("e", i);

            const num = parseInt(
                bencodedValue.substring(i + 1, end)
            );

            list.push(num);

            i = end + 1;
        }

        else {
            throw new Error("Unsupported type inside list");
        }
    }

    return list;

    }
    return parseInt(bencodedValue.substr(1, end - 1));

  }
  else {
    throw new Error("Only strings are supported at the moment");
  }
}

function main() {
  const command = process.argv[2];

  // You can use print statements as follows for debugging, they'll be visible when running tests.
  console.error("Logs from your program will appear here!");

  //TODO: Uncomment the code below to pass the first stage
  if (command === "decode") {
    const bencodedValue = process.argv[3];
  
    // In JavaScript, there's no need to manually convert bytes to string for printing
    // because JS doesn't distinguish between bytes and strings in the same way Python does.
    console.log(JSON.stringify(decodeBencode(bencodedValue)));
  } else {
    throw new Error(`Unknown command ${command}`);
  }
}

main();
