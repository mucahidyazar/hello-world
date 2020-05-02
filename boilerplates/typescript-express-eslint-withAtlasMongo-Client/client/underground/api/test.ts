interface Test1 {
  arg1: number,
  arg2: number
}

interface Test2 {
  arg1: string,
  arg2: number
}

interface Test3 {
  arg1: string,
  arg2: string
}

const funcTest = <Test>(arg1:Test, arg2:Test) => {
  console.log(arg1)
};

funcTest<Test1>({arg1: 1, arg2: 2}, {arg1: 3, arg2: 4}) {
  console.log(arg1)
}