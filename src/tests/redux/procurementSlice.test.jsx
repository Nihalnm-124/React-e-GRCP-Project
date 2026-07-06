import reducer,{
setProcurements,
addProcurement,
updateProcurement,
deleteProcurement,
} from "../../store/slices/procurementSlice";

describe("procurementSlice",()=>{

const initial={
procurements:[]
};

test("initial",()=>{

expect(
reducer(undefined,{type:undefined})
).toEqual(initial);

});

test("set",()=>{

const state=reducer(
initial,
setProcurements([{id:1}])
);

expect(state.procurements.length).toBe(1);

});

test("add",()=>{

const state=reducer(
initial,
addProcurement({id:5})
);

expect(state.procurements[0].id).toBe(5);

});

test("update",()=>{

const state=reducer(
{procurements:[{id:1,name:"A"}]},
updateProcurement({id:1,name:"B"})
);

expect(state.procurements[0].name).toBe("B");

});

test("delete",()=>{

const state=reducer(
{procurements:[{id:1}]},
deleteProcurement(1)
);

expect(state.procurements.length).toBe(0);

});

});