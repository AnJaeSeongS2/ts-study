type TeamName = 'T1-1' | 'T1-2' | 'T1-3'
interface Team {
    floor: 1 | 2 | 3;
    name: TeamName;
}

function test():void {
    let teamTest:Team = {
        floor: 1,
        name: 'T1-1'
    }
    
}

export default {
    test
}