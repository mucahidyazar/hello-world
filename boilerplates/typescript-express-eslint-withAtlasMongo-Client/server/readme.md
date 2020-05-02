"scripts": {
  ...,
  "build": "tsc -p ./"
},
-p => --project


##ESLINT SETTINGS with TYPESCRIPT
yarn add -D eslint @types/parser @typescript-eslint/eslint-plugin
typescriptte eslinti kullanmak icin bu 4 paketi yuluyoruz.
ve buradaki .eslintrc.json daki gibi ayarlarini yapiyoruz.
- `eslint`: the core ESLint library
- `@typescript-eslint/parser`: parser that will allow ESLint to lint TypeScript code
- `@typescript-eslint/eslint-plugin`: plugin when used in conjunction with`@typescript-eslint/parser` contains many TypeScript specific ESLint rules.

daha sonra eslint.valdiate yi asagidaki gibi ayarliyoruz
"eslint.validate": [
  "javascript",
  "javascriptreact",
  {
    "language": "typescript",
    "autoFix": true
  },
  {
    "language": "typescriptreact",
    "autoFix": true
  }
]

apollo-server-express => Typescript projeler icindir.
graphql =>
@types/graphql => 


MONGODB icin
mongodb
@types/mongodb -D

//Database bilgileri gibi onemli bilgileri saklamak ve githuba yuklememek icin
dotenv -D => asil paketi devdependenciese kaydetmemizin nedeni zaten heroku gibi sunucular bu paketi anliyor ve gerekeni yapiyor.
@types/dotenv -D


//CLIENT ICIN
react-apollo = useQuery useMutation icin
apollo-boots => ApolloClient serveri ayaga kaldirmak icin
graphql