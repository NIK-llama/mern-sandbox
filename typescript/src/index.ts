//  =========================
//  Typescript - NOTE-BOOK
//  =========================


//  =========================
//  Interfaces (Basic Example)
//  =========================
// interface UserType {
//     firstname: string;
//     lastname: string;
//     age: number;
// }

// function greet(user: UserType) {}

// let user: UserType = {
//     firstname: "nik",
//     lastname: "c",
//     age: 21,
// }


//  =========================
//  Intersection Types
//  =========================
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
//     name: "nik",
//     startDate: new Date(),
//     department: "tech",
// }

// console.log(`${teamLead.name} ${teamLead.startDate} ${teamLead.department}`);


//  =========================
//  Interfaces with Classes
//  =========================
// interface People {
//     name: string;
//     age: number;
// }

// class Manager implements People {
//     name: string;
//     age: number;

//     constructor(name: string, age: number){
//         this.name = name;
//         this.age = age;
//     }
// }

// let user2 = new Manager("Nik",20);
// console.log(user2.name);


//  =========================
//  Functions in TypeScript with array as input
//  (Finding Max Value)
//  =========================
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


//  =========================
//  Array Filtering Example
//  =========================
// interface Person {
//     name: string;
//     lastname: string;
//     age: number; 
// }

// function isLegal(persons: Person[]) {
//     return persons.filter((user) => user.age > 18);
// }

// console.log(isLegal([{name: "nik",lastname: "cc",age: 20},{name: "vik",lastname: "ck",age: 14}]));


//  =========================
//  Utility Types - Pick & Partial
//  =========================
// interface User {
//     id: number;
//     name: string;
//     age: number;
//     email: string;
//     password: string;
// }

// type UserProfile = Pick<User, 'name' | 'age' | 'email'>;
// type UserProfileOptional = Partial<UserProfile>;

// function displayUser(user: UserProfileOptional) {
//     console.log(`${user.name}-${user.age}-${user.email}`)
// }

// const user3 = {
//     id: 2,
//      name: "nik",
//     age: 20,
//     email: "blabla@nik.com",
//     password: "12345"
// }

// displayUser(user3);


//  =========================
//  Utility Types - Readonly
//  =========================
// interface UserReadonly {
//     name: string;
//     age: number;
// }

// const user4: Readonly<UserReadonly> = {
//     name: "nik",
//     age: 21
// }

//  user4.name = "nikkk"; (Cannot assign to 'name' because it is a read-only property)


//  =========================
//  Utility Types - Record
//  =========================
// type Users = Record<string, { name: string, age: number }>;

// const user5: Users = {
//     "01": {name: "nik", age: 20},
//     "02": {name: "sik", age: 21},
// } 

// console.log(user5["01"].age);

//  =========================
//  Utility Types - Map
//  =========================

// type User = {
//     name: string;
//     age: number;
// }

// const users = new Map<string, User>();
// users.set("01", {name: "nik", age: 20})
// users.set("02", {name: "sik", age: 21});

// const user = users.get("02");
// console.log(user);

//  =========================
//  Utility Types - Exclude
//  =========================

// type EventType = 'click' | 'scroll' | 'mouseover';
// type ExcludeEventType = Exclude<EventType, 'scroll'>;

// const handelEvent = (event: ExcludeEventType) => {
//     console.log(`Handeling Even : ${event}`);
// }

// handelEvent('click');
// handelEvent('scroll'); // Argument of type '"scroll"' is not assignable to parameter of type 'ExcludeEventType'

//  =========================
//  Type inferense in zod
//  =========================

// const userProfileSchema = z.object({
//     name: z.string(),
//     email: z.string().email().optional();
// });

// type FinalUserProfileSchema = z.infer<typeof userProfileSchema>;

