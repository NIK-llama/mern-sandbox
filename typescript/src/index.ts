type Employee = {
    name: String,
    startDate: Date
}

type Manager = {
    name: String,
    department: String
}

type TeamLead = Employee & Manager;

const teamLead: TeamLead = {
    name: "nik",
    startDate: new Date(),
    department: "tech"
}

console.log(`${teamLead.name} ${teamLead.startDate} ${teamLead.department}`);



// interface UserType {
//     firstname: String,
//     lastname: String,
//     age: number
// }

// function greet(user: UserType) {

// }

// let user: UserType = {
//     firstname: "nik",
//     lastname: "c",
//     age: 21
// }