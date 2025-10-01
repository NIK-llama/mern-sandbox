"use strict";
// interface UserType {
//     firstname: string;
//     lastname: string;
//     age: number;
// }
Object.defineProperty(exports, "__esModule", { value: true });
function isLegal(persons) {
    return persons.filter((user) => user.age > 18);
}
console.log(isLegal([{ name: "nik", lastname: "cc", age: 20 }, { name: "vik", lastname: "ck", age: 14 }]));
//# sourceMappingURL=index.js.map