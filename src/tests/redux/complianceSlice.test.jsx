import reducer,{
setCompliances,
addCompliance,
updateCompliance,
deleteCompliance,
} from "../../store/slices/complianceSlice";

describe("complianceSlice",()=>{

const initial={
compliances:[]
};

test("initial",()=>{

expect(
reducer(undefined,{type:undefined})
).toEqual(initial);

});

test("set",()=>{

const state=reducer(
initial,
setCompliances([{id:1}])
);

expect(state.compliances.length).toBe(1);

});

test("add",()=>{

const state=reducer(
initial,
addCompliance({id:2})
);

expect(state.compliances[0].id).toBe(2);

});

test("update",()=>{

const state=reducer(
{compliances:[{id:1,name:"Old"}]},
updateCompliance({id:1,name:"New"})
);

expect(state.compliances[0].name).toBe("New");

});

test("delete",()=>{

const state=reducer(
{compliances:[{id:1}]},
deleteCompliance(1)
);

expect(state.compliances.length).toBe(0);

});

});