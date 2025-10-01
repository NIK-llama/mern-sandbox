// interface UserType {
//     firstname: string;
//     lastname: string;
//     age: number;
// }

// function greet(user: UserType) {

// }

// let user: UserType = {
//     firstname: "nik";
//     lastname: "c";
//     age: 21;
// }

// type Employee = {
//     name: string;
//     startDate: Date;
// }

// type Manager = {
//     name: string;
//     department: string;
// }

// type TeamLead = Employee & Manager;

// const teamLead: TeamLead = {
//     name: "nik";
//     startDate: new Date();
//     department: "tech";
// }

// console.log(`${teamLead.name} ${teamLead.startDate} ${teamLead.department}`);


// interface People {
//     name: string;
//     age: number;
// }

// class Manager implements People{
//     name: string;
//     age: number;

//     constructor(name: string, age: number){
//         this.name = name;
//         this.age = age;
//     }
// }

// let user = new Manager("Nik",20);
// console.log(user.name);

// function getMax(nums: number[]): number {
//     if (nums.length === 0) {
//         throw new Error("Array is empty");
//     }

//     let maxVal = nums[0];
//     for (let i = 1; i < nums.length; i++) {
//         if (nums[i] > maxVal) {
//             maxVal = nums[i];
//         }
//     }
//     return maxVal;
// }


// console.log(getMax([5, 10, 3, 42, 7]));


interface Person {
    name: string;
    lastname: string;
    age: number; 
}

function isLegal(persons: Person[]) {
    return persons.filter((user) => user.age > 18);
}

console.log(isLegal([{name: "nik",lastname: "cc",age: 20},{name: "vik",lastname: "ck",age: 14}]));