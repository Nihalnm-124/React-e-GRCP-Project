import reducer,{
setVendors,
addVendor,
updateVendor,
deleteVendor,
} from "../../store/slices/vendorsSlice";

describe("vendorsSlice",()=>{

const initial={
vendors:[]
};

test("initial",()=>{

expect(
reducer(undefined,{type:undefined})
).toEqual(initial);

});

test("set",()=>{

const state=reducer(
initial,
setVendors([{id:1}])
);

expect(state.vendors.length).toBe(1);

});

test("add",()=>{

const state=reducer(
initial,
addVendor({id:2})
);

expect(state.vendors[0].id).toBe(2);

});

test("update",()=>{

const state=reducer(
{vendors:[{id:1,name:"Old"}]},
updateVendor({id:1,name:"New"})
);

expect(state.vendors[0].name).toBe("New");

});

test("delete",()=>{

const state=reducer(
{vendors:[{id:1}]},
deleteVendor(1)
);

expect(state.vendors.length).toBe(0);

});

});