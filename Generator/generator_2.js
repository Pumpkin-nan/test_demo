
const teams = [
  {name: 'Team 1', members: ['Paul', 'Lisa']},
  {name: 'Team 2', members: ['Laura', 'Tim']}
]
function* getMembers(members) {
  // ['Laura', 'Tim']
  for(let i = 0; i < members.length; i++) {
    yield members[i]
  }
}
function* getTeams(teams) {
  for(let i = 0; i < teams.length; i++) {
    // let a = {name: 'Team 1', members: ['Paul', 'Lisa']}
    yield getMembers(teams[i].members) // 错误
    // yield* getMembers(teams[i].members)
    // 等同于
    // for (let v of getMembers(teams[i].members)) {
    //   yield v;
    // }
  }
}

const obj = getTeams(teams)
// console.log(obj.next())
// console.log(obj.next())

console.log(obj.next().value)
for (let v of obj.next().value) {
  // yield v
  console.log(v)
}
