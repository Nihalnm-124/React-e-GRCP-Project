import reducer,{
setRisks,
addRisk,
updateRisk,
deleteRisk,
} from "../../store/slices/riskSlice";

describe("riskSlice",()=>{

const initial={
risks:[]
};

test("initial",()=>{

expect(
reducer(undefined,{type:undefined})
).toEqual(initial);

});

test("set",()=>{

const state=reducer(
initial,
setRisks([{id:1}])
);

expect(state.risks.length).toBe(1);

});

test("add",()=>{

const state=reducer(
initial,
addRisk({id:2})
);

expect(state.risks[0].id).toBe(2);

});

test("update",()=>{

const state=reducer(
{risks:[{id:1,name:"A"}]},
updateRisk({id:1,name:"B"})
);

expect(state.risks[0].name).toBe("B");

});

test("delete",()=>{

const state=reducer(
{risks:[{id:1}]},
deleteRisk(1)
);

expect(state.risks.length).toBe(0);

});

});