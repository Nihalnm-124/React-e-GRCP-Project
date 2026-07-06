import reducer,{
setAudits,
addAudit,
updateAudit,
deleteAudit,
} from "../../store/slices/auditSlice";

describe("auditSlice",()=>{

const initial={audits:[]};

test("initial",()=>{

expect(
reducer(undefined,{type:undefined})
).toEqual(initial);

});

test("set",()=>{

const state=reducer(
initial,
setAudits([{id:1}])
);

expect(state.audits.length).toBe(1);

});

test("add",()=>{

const state=reducer(
initial,
addAudit({id:2})
);

expect(state.audits[0].id).toBe(2);

});

test("update",()=>{

const state=reducer(
{audits:[{id:1,name:"A"}]},
updateAudit({id:1,name:"B"})
);

expect(state.audits[0].name).toBe("B");

});

test("delete",()=>{

const state=reducer(
{audits:[{id:1}]},
deleteAudit(1)
);

expect(state.audits.length).toBe(0);

});

});